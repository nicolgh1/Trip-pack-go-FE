import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useEffect, useState } from "react";
import { ActivitiesTypes } from "./4.2.1.ActivitiesTypes";
import { ActivitiesList } from "./4.2.2.ActivitiesList";
import { fetchAttractions } from "../../googleApi";
import "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import Footer from "./FooterNavigation";
import { UserItineraryDetailPage } from "../Pages/6.1.UserItineraryDetailPage";

const MoreActivitiesSelection = ({ route, navigation }) => {
  const { responseObj, setResponseObj } = route.params;
  console.log(responseObj);
  const [currentDayOther, setCurrentDayOther] = useState(1);
  const mainAct = responseObj.itinerary_info[currentDayOther - 1].main_activity;
  const [dayMainActivity, setDayMainActivity] = useState(mainAct);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(null);
  const [detailedActivitiesList, setDetailedActivitiesList] = useState({});
  const [hide, setHide] = useState(false);
  const [postedItinerary, setPostedItinerary] = useState({});

  useEffect(() => {
    if (selectedTypes.length === 0) return;

    setLoading(true);

    const promisesArr = selectedTypes.map((type) => {
      const formatedType = type.replace(" ", "_").toLowerCase();
      return fetchAttractions(dayMainActivity.location, 500, formatedType).then(
        (data) => ({ type, data })
      );
    });

    Promise.all(promisesArr)
      .then((results) => {
        const resultsObject = results.reduce((acc, { type, data }) => {
          acc[type] = data.slice(0, 10);
          return acc;
        }, {});
        setDetailedActivitiesList(resultsObject);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attractions:", error);
        setLoading(false);
      });
  }, [selectedTypes]);

  const handleNextDay = () => {
    if (currentDayOther < responseObj.total_days) {
      setCurrentDayOther(currentDayOther + 1);
    }
  };

  const handlePreviousDay = () => {
    if (currentDayOther > 1) {
      setCurrentDayOther(currentDayOther - 1);
    }
  };

  const handleSeeActivities = () => {
    setSelectedTypes([]);
    setHide(!hide);
  };

  const transformDateToTimestamp = (dateString) => {
    if (typeof dateString === "string") {
      const [day, month, year] = dateString.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      const timestamp = Timestamp.fromDate(date);
      return timestamp;
    }
    return dateString;
  };
  const itinerariesColRef = collection(db, "itineraries");

  const handleConfirmation = () => {
    const finalObject = { ...responseObj };

    finalObject.start_date = transformDateToTimestamp(finalObject.start_date);
    finalObject.end_date = transformDateToTimestamp(finalObject.end_date);

    finalObject.itinerary_info.map((item) => {
      item.date = transformDateToTimestamp(item.date);
    });

    addDoc(itinerariesColRef, finalObject)
      .then((document) => {
        return updateDoc(doc(db, "itineraries", document.id), {
          itinerary_id: document.id,
        }).then(() => {
          console.log(document.id, "document.id");
          setPostedItinerary(document);
        });
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  const handleSeeItinerary = () => {

  }

  const handleCreatePackingList = () => {
    
  }

  return (
    <View style={styles.screen}>
      {Object.keys(postedItinerary).length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Itinerary Has Been Submited</Text>
          <TouchableOpacity style={styles.button} onPress={handleSeeItinerary}>
            <Text style={styles.buttonText}>See Itinerary In Detail</Text>
          </TouchableOpacity>
          <Text style={styles.sectionSubTitle}>To Get You Ready for the Trip Let's Make a Packing List</Text>
          <TouchableOpacity style={styles.button} onPress={handleCreatePackingList}>
            <Text style={styles.buttonText}>Create Packing List</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.buttonsContainer}>
            {currentDayOther > 1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handlePreviousDay}
              >
                <Text style={styles.buttonText}>Previous Day</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}

            {currentDayOther < responseObj.total_days ? (
              <TouchableOpacity style={styles.button} onPress={handleNextDay}>
                <Text style={styles.buttonText}>
                  Go to day {currentDayOther + 1}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleConfirmation}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Confirm Itinerary</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.body}>
            <View style={styles.textContainer}>
              <Text style={styles.sectionTitle}>
                Choose Some More Activities for Day {currentDayOther} Near{" "}
                {
                  responseObj.itinerary_info[currentDayOther - 1].main_activity
                    .name
                }
              </Text>
            </View>

            <View>
              {!hide ? (
                <View>
                  <ActivitiesTypes
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    handleSeeActivities={handleSeeActivities}
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={handleSeeActivities}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Back to Types Choices</Text>
                  </TouchableOpacity>
                  <ActivitiesList
                    detailedActivitiesList={detailedActivitiesList}
                    setDetailedActivitiesList={setDayMainActivity}
                    responseObj={responseObj}
                    setResponseObj={setResponseObj}
                    currentDayOther={currentDayOther}
                    handleConfirmation={handleConfirmation}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
    padding: 10,
    zIndex: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "darkgreen",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  placeholder: {
    width: 100,
  },
  body: {
    flex: 1,
    width: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#14141410",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  subTitleText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  list: {
    maxHeight: 400,
    marginBottom: 20,
  },
  itemText: {
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default MoreActivitiesSelection;
