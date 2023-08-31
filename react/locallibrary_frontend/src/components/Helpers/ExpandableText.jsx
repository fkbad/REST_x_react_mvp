// https://www.kindacode.com/article/how-to-create-a-read-more-less-button-in-react/
import { useState } from "react";

// Create a reusable Read More/Less component
const ExpandableText = ({ children, descriptionLength }) => {
  const fullText = children;

  if (fullText.length <= descriptionLength) {
    return (
      <p className='text'>
        {fullText}
      </p>)
  }

  // Set the initial state of the text to be collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // This function is called when the read more/less button is clicked
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p className='text'>
      {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
      <span onClick={toggleText} className='toggle-button' href>
        {`  `}<u>{isExpanded ? 'Show less' : 'Show more'}</u>
      </span>
    </p>
  );
};

export default ExpandableText
