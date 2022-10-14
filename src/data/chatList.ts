import img from "/static/account-circle.svg";

const chatList = {
  item: [
    {
      avatar: img,
      name: "Иван Иванов",
      last_message: {
        text: "Lorem Ipsum is simply...",
        time: "20:00",
      },
      unread_count: 2,
    },
    {
      avatar: img,
      name: "Кино",
      last_message: {
        text: "Lorem Ipsum is simply...",
        time: "20:00",
      },
      unread_count: 0,
    },
    {
      avatar: img,
      name: "Татьяна",
      last_message: {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        time: "20:00",
      },
      unread_count: 90,
    },
  ],
};

export { chatList };
