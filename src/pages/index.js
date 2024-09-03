import { Inter } from "next/font/google";
// import styles from "./styles/Home.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Login from "./Login";
import Events from "./Events";
import ArtistForm from "./ArtistForm";
import VenueForm from "./VenueForm";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const user = useSelector(state => state.user.value)
  console.log("user", user)

  // Si le user est connecté...
  if (user.isConnected) {
    console.log("user dans l'index", user)
    if (user.isProfileCompleted) {
      console.log("isProfileCompleted")
      return <Events />
    } else {
      if (user.isVenue) {
        console.log("isVenue")
        return <VenueForm />
      } else {
        console.log("isNotVenue")
        return <ArtistForm />
      }
    }
  } else {
    return <Login />
  }
}
