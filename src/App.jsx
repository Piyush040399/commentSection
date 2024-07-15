import { useState } from "react";

function App() {
  const [comments, setComments] = useState("");
  const [data, setData] = useState([]);
  const [reply, setReply] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prev) => [
      { comments: comments, upVotes: 0, downVotes: 0, replies: [] },
      ...prev,
    ]);
    setComments("");
  };

  const handleReply = (id) => {
    if (reply[id]) {
      setData((prevData) =>
        prevData.map((item, index) =>
          index === id
            ? { ...item, replies: [...item.replies, reply[id]] }
            : item
        )
      );
      setReply({ ...reply, [id]: "" });
    }
  };

  const handleUpvotes = (id) => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === id ? { ...item, upVotes: item.upVotes + 1 } : item
      )
    );
  };

  const handleDownVotes = (id) => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === id ? { ...item, downVotes: item.downVotes + 1 } : item
      )
    );
  };

  const handleDelete = (id) => {
    setData(data.filter((item, i) => i !== id));
  };

  const handleReplyChange = (id, value) => {
    setReply({ ...reply, [id]: value });
  };

  return (
    <div className="mx-auto w-4/5 border border-gray-100 bg-gray-200 rounded pb-4">
      <p className="text-center text-3xl">Comments Section</p>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center mt-10 w-3/5 mx-auto"
      >
        <input
          type="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="bg-transparent border rounded w-full border-black p-2"
        />
        <button
          type="submit"
          className="ml-5 bg-blue-500 text-white px-2 rounded"
        >
          Comment
        </button>
      </form>
      <div className="mx-auto w-4/5 mt-20">
        <p className="text-2xl mb-4">All Comments</p>
        {data.length > 0 ? (
          data.map((item, i) => (
            <div key={i} className="bg-white rounded-md p-5 mt-4">
              <div className="flex mb-5 justify-between">
                <div className="w-32 flex">
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                    alt="User"
                    className="w-6 border border-black rounded-full"
                  />
                  <span className="ml-2">User</span>
                </div>
                <div>
                  <button onClick={() => handleDelete(i)}>x</button>
                </div>
              </div>
              <li className="list-none font-bold text-lg">{item.comments}</li>
              <div>
                <button onClick={() => handleUpvotes(i)}>
                  Upvotes {item.upVotes}
                </button>
                <button className="ml-2" onClick={() => handleDownVotes(i)}>
                  Downvotes {item.downVotes}
                </button>
              </div>
              <input
                type="text"
                value={reply[i] || ""}
                onChange={(e) => handleReplyChange(i, e.target.value)}
                className="border border-black w-60 rounded pl-2"
              />
              <button
                className="bg-blue-500 text-white text-sm px-2 rounded mt-4 ml-2"
                onClick={() => handleReply(i)}
              >
                Reply
              </button>
              {item.replies.length > 0 && (
                <div className="ml-4 mt-4">
                  {item.replies.map((rep, index) => (
                    <p
                      key={index}
                      className="text-sm bg-gray-100 mb-3 p-2 rounded"
                    >
                      {rep}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>...No comments</p>
        )}
      </div>
    </div>
  );
}

export default App;
