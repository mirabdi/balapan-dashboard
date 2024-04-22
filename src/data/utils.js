import { FiShoppingBag, FiEdit } from 'react-icons/fi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam, BsKanban } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineCalendar, AiOutlineAppstore, AiOutlineTag, AiOutlineUnorderedList } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { BiColorFill } from 'react-icons/bi';
const iconMap = {
  FiShoppingBag: <FiShoppingBag />,
  MdOutlineSupervisorAccount: <MdOutlineSupervisorAccount />,
  BsBoxSeam: <BsBoxSeam />,
  AiOutlineShoppingCart: <AiOutlineShoppingCart />,
  IoMdContacts: <IoMdContacts />,
  RiContactsLine: <RiContactsLine />,
  AiOutlineCalendar: <AiOutlineCalendar />,
  BsKanban: <BsKanban />,
  FiEdit: <FiEdit />,
  BiColorFill: <BiColorFill />,
  AiOutlineAppstore: <AiOutlineAppstore />,
  AiOutlineTag: <AiOutlineTag />,
  AiOutlineUnorderedList: <AiOutlineUnorderedList />
};

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);



export const convertLinks = (sections) => {
  const includedSections = sections.filter(section => section.included);
  const parsedLinks = includedSections.map(section => ({
    title: section.name,
    links: section.sub_sections.map(sub => ({
      url: sub.url,
      name: sub.name,
      icon: iconMap[sub.icon]
    }))
  }));
  return parsedLinks;
}
