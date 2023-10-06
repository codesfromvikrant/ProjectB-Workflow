const viewProject = (navigate, id, status) => {
  const queryParams = {
    id: id,
    status: status,
  };
  navigate(`tasks?${new URLSearchParams(queryParams)}`);
};

export { viewProject }