export const fetched = async (
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT",
    body?: any
  ) => {

  
    const response = await fetch(`/api/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      // todo: We need to handle this error and not just crash the app. With haste!
      throw new Error(response.status + "-" + response.statusText);
    }
    return response.json();
  };