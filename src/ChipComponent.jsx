import { useState } from "react";
import "./ChipComponent.scss";

const ChipComponent = () => {
  const [DataArray, setDataArray] = useState([
    {
      id: 1,
      name: "Laurel Verma",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "laurelverma@gmail.com",
    },
    {
      id: 2,
      name: "hermione maglu",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "hermionemaglu@gmail.com",
    },
    {
      id: 3,
      name: "James maglu",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "Jamesmaglu@gmail.com",
    },
    {
      id: 4,
      name: "Ron Weisley",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "RonWeisley@gmail.com",
    },
    {
      id: 5,
      name: "Harry Potter",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "HarryPotter@gmail.com",
    },
    {
      id: 7,
      name: "lily Potter",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "lilyPotter@gmail.com",
    },
    {
      id: 8,
      name: "james Potter",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "jamespotter@gmail.com",
    },
    {
      id: 9,
      name: "Hagrid potter",
      Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
      email: "Hagridpotter@gmail.com",
    },
  ]);

  const [ListArray, setListArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [inputValue, setinputValue] = useState([]);

  const addNewObject = (event) => {
    if (event.target.value !== "") {
      const newObject = {
        id: Math.max(...ListArray.map((item) => item.id), 0) + 1, // Generate a new id
        name: event.target.value,
        Url: "https://images.squarespace-cdn.com/content/v1/559b2478e4b05d22b1e75b2d/1549568089409-SJ70E6DVG3XTE70232OL/Nesbit.jpg",
        email: event.target.value.split(" ").join("") + "@gmail.com",
      };
      setListArray([...ListArray, newObject]);
      event.target.value = "";
      setinputValue("");
    }
  };

  const addSuggestedObject = (idToAdd) => {
    setSearchTerm("");
    setMatchingUsers([]);
    const AddingObject = DataArray.find((obj) => obj.id === idToAdd);
    const copyObject = { ...AddingObject };
    copyObject.id = Math.max(...ListArray.map((item) => item.id), 0) + 1;
    setListArray([...ListArray, copyObject]);

    const updatedArray = DataArray.filter((item) => item.id !== idToAdd);
    setDataArray(updatedArray);
    setinputValue("");
  };

  const deleteObject = (idToDelete) => {
    const DeletedObject = ListArray.find((obj) => obj.id === idToDelete);
    const copiedObject = { ...DeletedObject };
    copiedObject.id = Math.max(...DataArray.map((item) => item.id), 0) + 1;
    setDataArray([...DataArray, copiedObject]);

    const updatedArray = ListArray.filter((item) => item.id !== idToDelete);
    setListArray(updatedArray);
  };

  const handleInputChange = (event) => {
    setinputValue(event.target.value);
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    if (inputValue.length === 0 || false) {
      setSearchTerm("");
      setMatchingUsers([]);
    } else {
      const filteredUsers = DataArray.filter((user) =>
        user.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setMatchingUsers(filteredUsers);
    }
  };

  return (
    <div className="outer_body">
      <h1 className="heading">Pick Users</h1>
      <div className="tags-input">
        <ul id="tags">
          {ListArray.map((data, index) => (
            <li key={index} className="tag">
              <img className="tag-img" src={data.Url} alt="img" height="30px" width="30px" />
              <span className="tag-title">{data.name}</span>
              <span className="tag-close-icon" onClick={() => deleteObject(data.id)}>
                x
              </span>
            </li>
          ))}
        </ul>
        <div style={{ position: "relative" }}>
          <input
            value={inputValue}
            type="text"
            onChange={handleInputChange}
            onKeyUp={(event) => (event.key === "Enter" ? addNewObject(event) : null)}
            onFocus={(event) => setMatchingUsers(DataArray)}
            placeholder="Press enter to add user"
          />
          {matchingUsers.length > 0 && (
            <div className="matchingUsersOuter" style={{ position: "absolute" }}>
              <ul className="matchingUsers">
                {matchingUsers.map((user) => (
                  <li
                    className="matchingUser"
                    key={user.id}
                    onClick={() => addSuggestedObject(user.id)}
                  >
                    <img className="user-img" src={user.Url} alt="img" height="30px" width="30px" />
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;
