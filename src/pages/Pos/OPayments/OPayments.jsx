import { useState, useEffect, useRef } from "react";
// import OPaymentsList from "../../../components/App/opayments/OPaymentsList";
import { Suspense } from "react";
import { RightModal, OPaymentsList, OPaymentItem } from "../../../components";
import { Await } from "react-router-dom";
import { BASE_URL } from "../../../data/config";
import { useStateContext } from "../../../contexts/ContextProvider";

function OPayments() {
  const [opayments, setOpayments] = useState([]);
  const [selectedOPayment, setSelectedOPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const { rightModal, setRightModal, showToast, token } = useStateContext();
  const url = new URL(window.location.href);
  const is_archived = url.pathname.split("/").pop() === "archived";
  const title =  is_archived ? "Архивные счета" : "Активные счета";

  async function loadOPaymentsList(is_archived = false, token, page = 1, query = "") {
    let url = `${BASE_URL}/money/admin-api/opay?is_archived=${is_archived}&page=${page}&query=${query}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        let message = "Не удалось загрузить счета";
        try {
          const resData = await response.json();
          message = resData.message;
        } catch (error) {
          console.error("Не удалось разобрать сообщение об ошибке:", error);
        }
        throw new Error(message);
      }
      const resData = await response.json();
      if (resData.status !== 0) {
        throw new Error(resData.message || "Не удалось загрузить счета");
      }
      return resData.response;
    } catch (error) {
      showToast({
        title: "Ошибка!",
        content: error.message,
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1); // Reset to the first page for a new search
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedOpayments = await loadOPaymentsList(
        is_archived,
        token,
        1,
        newQuery
      );
      setOpayments(loadedOpayments);
    }, 2000);
  };

  const loadMoreOpayments = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedOpayments = await loadOPaymentsList(
      is_archived,
      token,
      nextPage,
      query
    );
    if (Array.isArray(loadedOpayments)) {
      setOpayments((prev) => [...prev, ...loadedOpayments]);
    } else {
      console.error("Загруженные счета не являются массивом:", loadedOpayments);
    }
  };

  const afterUpdateStatus = (updated) => {
    setOpayments((prev) =>
      prev.map((opayment) =>
        opayment.id === updated.id ? updated : opayment
      )
    );
  };

  useEffect(() => {
    async function fetchOPayments() {
      try {
        setLoading(true);
        const response = await loadOPaymentsList(
          is_archived,
          token,
          1,
          query
        );
        if (!Array.isArray(response)) {
          console.error("Загруженные счета не являются массивом:", response);
          throw new Error("Не удалось загрузить счета");
        }
        setOpayments(response);
      } catch (err) {
        showToast({
          title: "Ошибка!",
          content: err.message || "Не удалось загрузить счета",
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchOPayments();
  }, [token, is_archived]);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Загрузка...</p>}>
        <>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Поиск..."
            className="search-input float-right mb-4 p-2 border rounded-lg shadow-md"
          />
          <OPaymentsList
            opayments={opayments}
            title={title}
            selectHandler={(employee) => {
              setSelectedOPayment(employee);
              setRightModal(true);
            }}
          />
          <button
            onClick={loadMoreOpayments}
            className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Загрузить еще"}
          </button>
        </>
      </Suspense>
      {rightModal && selectedOPayment && (
        <RightModal
          title={"Счет #: " + selectedOPayment.order_id}
          afterClose={() => setSelectedOPayment(null)}
        >
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Загрузка...</p>}
          >
            <Await resolve={selectedOPayment}>
              {(loadedOPayment) => <OPaymentItem opayment={loadedOPayment} afterUpdateStatus={afterUpdateStatus} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">
            Здесь будут связанная статистика и дополнительная информация...
          </h1>
        </RightModal>
      )}
    </>
  );
}

export default OPayments;



