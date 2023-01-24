export const getUsers = (messages) => {
  return [...new Set(messages.map((elem) => elem.sender))].map((elem) => {
    return { user: elem };
  });
};

export const getUsersWithUnreadMessages = (messages) => {
  return messages.filter((elem) => !elem.read);
};

export const getUsersUnreadMessagesCount = (messages) => {
    const allUsersCountNull =  messages.reduce((acc, currentValue) => {
        acc[currentValue.sender] = 0;
        return { ...acc };
      }, {});
    const allUsers =  messages.filter(elem => !elem.read).reduce((acc, currentValue) => {
    acc[currentValue.sender] =
      acc[currentValue.sender] || acc[currentValue.sender] === 0
        ? acc[currentValue.sender] + 1
        : 0;
    return { ...acc };
  }, {});
  return {...allUsersCountNull, ...allUsers}
};

const getLastMessageSendByUserThatIsUnread = (messages) => {
  return messages.reduce((acc, currentValue) => {
    if (!acc[currentValue.sender]) {
      acc[currentValue.sender] = currentValue.created;
      return { ...acc };
    }
    if (acc[currentValue.sender] < currentValue.created)
      acc[currentValue.sender] = currentValue.created;
    return { ...acc };
  }, {});
};

export const usersSortedByCriteria = (messages) => {
  const unreadCount = getUsersUnreadMessagesCount(messages);
  const lastUnread = getLastMessageSendByUserThatIsUnread(messages);

  const result = [];
  Object.entries(unreadCount).forEach(([key, value]) => {
    result.push({
      user: key,
      unreadCount: value,
      lastUnread: lastUnread[key],
    });
  });

  return result
    .sort((a, b) => b.unreadCount - a.unreadCount)
    .sort((a, b) => {
      if (a.unreadCount === 0 || b.unreadCount === 0) return 0;
      return b.lastUnread - a.lastUnread;
    });
};

export const getMessagesReceivedFromOneUser = (messages, user) => {
  return messages.filter((elem) => elem.sender === user);
};
