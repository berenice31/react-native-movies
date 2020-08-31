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
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _loadFilms() {
    this.setState({ isLoading: true }); // Lancement du chargement
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          }); // arret du chargement
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text; // Modif du texte recherché à chaque saisie de texte,
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          {/* le component activity indicator est un loader. il possede une propriété size pour définir la taille qu'il prend a l'écran */}
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    //! attention, setState est asyncrone ! pour s'assurer de ce qu'il se passe juste apres le setState il faut lancer une fonction
    this.setState({ films: [] }, () => {
      console.log(
        `page ${this.page} / totalPages ${this.totalPages} / Nombre de films ${this.state.films.length}`
      );
      this._loadFilms(); // on lance la recherche lorsque le setState est terminé
    });
  }

  _displayDetailForFilm = (idFilm) => {
    console.log(`Display film with id ${idFilm}`);
    this.props.navigation.navigate("Detail");
  };
  render() {
    console.log("RENDER");
    console.log(this.state.isLoading);
    console.log("props", this.props);
    return (
      <View style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
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
          onPress={() => this._searchFilms()}
        />
        <FlatList
          //  cette prop permet de déclencher le chargement de la suite des resultats lorsqu'il reste une moitié de la longueur de la flatList a afficher
          onEndReachedThreshold={(0, 5)}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
            console.log("onEndReached");
          }}
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
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
