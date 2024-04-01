import '../styles/ContentHolder.css';
function ContentHolder({ children }) {
  return (
    <div className="content-holder">
      {children}
    </div>
  );
}

export default ContentHolder;