import { View, Text, TouchableOpacity} from "react-native"

export const ActivitiesTypes = ({selectedTypes, setSelectedTypes, handleSeeActivities}) => {
    const activities_list = ["Aquarium","Amusement park","Art gallery","Tourist attraction","Spa","Zoo","Night club","Museum","Bar","Bowling alley","Cafe","Casino","Church","City hall","Hindu temple","Mosque","Movie_theater","Park","Restaurant"]

    const handlePress = (item) => {
        handleSeeActivities()
        if (selectedTypes.includes(item)) {
            setSelectedTypes(selectedTypes.filter(type => type !== item))
        } else if(selectedTypes.length < 5) {
            setSelectedTypes([...selectedTypes, item])
        }
    }

    return (
        <View>
            {activities_list.map((item) => {
                return (
                    <TouchableOpacity key={item} onPress={() => handlePress(item)} >
                    <Text >{item}</Text>
                </TouchableOpacity>
                )
            })}
            <Text>{selectedTypes.length}</Text>
        </View>
    )
}