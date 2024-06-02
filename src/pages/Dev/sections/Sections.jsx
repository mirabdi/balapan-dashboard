import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, SectionsList, SectionItem } from "../../../components";
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';

async function loadSectionsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/dashboard/admin-api/sections";
  if (is_archived) {
    url += "?is_archived=" + is_archived;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to load sections");
  } else {
    const resData = await response.json();
    return resData.response;
  }
}

function Sections({ archived = false }) {
  let title = "Активные страницы";
  const [selectedSection, setSelectedSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { rightModal, setRightModal, showToast } = useStateContext();

  if (archived) {
    title = "Архивные страницы";
  }

  useEffect(() => {
    async function fetchSections() {
      try {
        const sectionsData = await loadSectionsList(archived);
        setSections(sectionsData);
      } catch (error) {
        showToast({ 
          title: 'Ошибка!', 
          content: error.message, 
          cssClass: 'e-toast-danger', 
          icon: 'e-error toast-icons' 
        });
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, [showToast, archived]);

  return (
    <>
      {loading ? (
        <p className="flex flex-wrap">Loading...</p>
      ) : (
        <SectionsList sections={sections} title={title} selectHandler={(section) => {
          console.log("selectHandler");
          setSelectedSection(section);
          setRightModal(true);
        }} />
      )}
      {rightModal && selectedSection && (
        <RightModal title={"Cотрудник: " + selectedSection.name} afterClose={() => setSelectedSection(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <SectionItem section={selectedSection} />
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      )}
    </>
  );
}

export default Sections;
