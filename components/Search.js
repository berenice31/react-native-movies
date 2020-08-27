import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    // ici, searchedText n'est PAS dans le state car sinon, a chaque fois que l'on tape une lettre, il y a un nouveau rendu
    // ce n'est pas une bonne pratique de déclencher un nouveau rendu alors que rien ne change !
    this.searchedText = "";
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _loadFilms() {
    this.setState({ isLoading: true });
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then((data) =>
        this.setState({ films: data.results, isLoading: false })
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
  render() {
    console.log("RENDER");
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._loadFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          placeholder="Titre du film"
          style={styles.textinput}
        />
        <Button
          title="Rechercher"
          style={{
            height: 50,
            marginLeft: 5,
            marginRight: 5,
          }}
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
