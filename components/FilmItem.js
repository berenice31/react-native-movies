import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";

class FilmItem extends React.Component {
  render() {
    const film = this.props.film;
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{ uri: getImageFromApi(film.poster_path) }}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title_text}>{film.title} </Text>
            <Text style={styles.vote_text}> {film.vote_average}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.date_text}> {film.release_date} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content: {
    flex: 1,
    margin: 5,
  },
  header: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});
export default FilmItem;
