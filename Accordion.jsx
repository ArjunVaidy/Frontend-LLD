/**
 * For accordion - we need title,content and a arrow with collapsable and expandable
 */
const data = [
  {
    title: "Accordion Item #1",
    body: "Accordion Item #1 body",
  },
  {
    title: "Accordion Item #2",
    body: "Accordion Item #2 body",
  },
  {
    title: "Accordion Item #3",
    body: "Accordion Item #3 body",
  },
  {
    title: "Accordion Item #4",
    body: "Accordion Item #4 body",
  },
  {
    title: "Accordion Item #5",
    body: "Accordion Item #5 body",
  },
];

const Accordion = () => {
  const [openIndices, setOpenIndices] = useState([]); // If we have to open multiple accordions at a time, we need array
  return (
    <div>
      {data.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          body={item.body}
          isOpen={index === openIndex}
          setIsOpen={() => {
            // logic for already open accordions
            if (openIndices.includes(index)) {
              setOpenIndices(openIndices.filter((i) => i !== index));
            }
            // logic for closed accordions
            else {
              setOpenIndices([...openIndices, index]);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Accordion;

/**
 * Don't have state here - because each accordion item maintains its own state
 * So each accordion item is independent as it has its own state
 * All accordion items should be dependent on others - b/c if one closes other should open
 */

const AccordionItem = ({ title, body, isOpen, setIsOpen }) => {
  return (
    <div>
      <div
        onClick={() => {
          setIsOpen();
        }}
      >
        {/* flex - justifyContent - space between */}
        <span>{title}</span>
        <span>{<ArrowIcon />}</span>
      </div>
      {isOpen && <div>{body}</div>}
    </div>
  );
};

export default AccordionItem;
