import React from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

import { AppRegistry, Pano, Text, View, VrButton } from "react-vr";

const uriTemplate = "https://source.unsplash.com/1600x900/?";
const defaultData = {
  text: "Tokyo",
  keyword: "tokyo"
};

// Reducer
const reducer = (state = defaultData, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        text: action.payload.text,
        keyword: action.payload.keyword
      };
    default:
      return state;
  }
};

// Redux store
const store = createStore(reducer);

// Action Creator
const update = data => ({
  type: "UPDATE",
  payload: data
});

const mapStateToProps = state => ({
  text: state.text,
  keyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
  onClick: keyword => dispatch(update(keyword))
});

// Component styles
const styles = {
  textArea: {
    marginBottom: 0.15
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 0.5,
    fontWeight: "400",
    layoutOrigin: [0.5, 0.5],
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [0, 0, -3] }]
  },
  buttonArea: {
    flexDirection: "row",
    layoutOrigin: [0.5, 0.5],
    marginLeft: 0.3,
    marginRight: 0.3
  },
  button: {
    width: 0.8
  },
  buttonText: {
    backgroundColor: "black",
    height: 0.3,
    color: "yellowgreen",
    fontSize: 0.12,
    fontWeight: "400",
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.1,
    paddingRight: 0.1,
    marginLeft: 0.1,
    marginRight: 0.1,
    textAlign: "center",
    textAlignVertical: "center",
    transform: [{ translate: [0, 0, -3] }],
    borderRadius: 0.1
  }
};

const buttonData = [
  {
    id: "tokyo",
    text: "Tokyo",
    keyword: "tokyo"
  },
  {
    id: "kyoto",
    text: "Kyoto",
    keyword: "kyoto"
  },
  {
    id: "newyork",
    text: "New York",
    keyword: "new york"
  },
  {
    id: "paris",
    text: "Paris",
    keyword: "paris"
  }
];

// VR components
const ButtonList = ({ buttonData, onClick }) =>
  buttonData.map(data =>
    <VrButton
      key={`button_${data.id}`}
      style={styles.button}
      onClick={() => onClick(data)}
    >
      <Text style={styles.buttonText}>
        {data.text}
      </Text>
    </VrButton>
  );

const SampleVR = ({ text, keyword, onClick }) =>
  <View>
    <Pano source={{ uri: `${uriTemplate}${keyword}` }} />
    <View style={styles.textArea}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
    <View style={styles.buttonArea}>
      {ButtonList({ buttonData, onClick })}
    </View>
  </View>;

// Redux container
const Container = connect(mapStateToProps, mapDispatchToProps)(SampleVR);

const App = () =>
  <Provider store={store}>
    <Container />
  </Provider>;

AppRegistry.registerComponent("app", () => App);
