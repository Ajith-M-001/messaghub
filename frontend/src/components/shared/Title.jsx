/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "MessageHub",
  description = "Connect, chat, and collaborate in real-time with MessageHub.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default Title;
