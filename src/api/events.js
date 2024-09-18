import moment from "moment";

export const createEvent = async (
  token,
  title,
  description,
  date,
  hour_start,
  picture,
  genres,
  facebook,
  instagram
) => {
  try {
    const response = await fetch(`http://localhost:3000/events/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        title,
        description,
        date,
        hour_start: moment(hour_start._d).format("LT"),
        picture,
        genres,
        socials: {
          facebook,
          instagram
       }
      }),
    });
    const data = await response.json();
    console.log("data create event => ", data);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during creation:", error.message);
  }
};

export const displayEvents = async (token) => {
  try {
    const response = await fetch(
      `http://localhost:3000/events/displayEvents/${token}`,
      {}
    );
    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error("Error during creation:", error.message);
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch("http://localhost:3000/events", {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events: ", error.message);
  }
};

  export const getEventById = async (id) => {
    try{
      const response = await fetch(`http://localhost:3000/events/id/${id}`,
      )
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching an event by Id: ", error.message)
    }
  }

  export const getEventsByVenueToken = async (token) =>
  {
    try{
      const response = await fetch(`http://localhost:3000/events/getEventsByVenueToken/${token}`,
      )
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events by venue token: ", error.message)
    }
  }


  export const displayEventsByBooking = async (token) => {
    try{
      const response = await fetch(
        `http://localhost:3000/events/token/${token}`
      )
      const  data = await response.json()
      return data
    }catch(error){
      console.error("Error fetching events by artist token: ", error.message)
    }
  }
  
