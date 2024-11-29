exports.handler = async (event) => {
    const { location } = JSON.parse(event.body);
    // Your logic to modify DB

    return {
      statusCode: 200,
      body: JSON.stringify({ callback: `DOMAIN/SESSION_ID` }),
    };
  };