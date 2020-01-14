/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { tw } from "react-native-tailwindcss";
import Icon from "react-native-vector-icons/FontAwesome";

import { AppContext } from "../../AppContext";

import CustomButton from "../components/CustomButton";
import SelectableCategory from "../components/pockets/SelectableCategory";

class AddPocketViewComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(`headerTitle`, `AddPocket`)
    };
  };

  constructor() {
    super();

    this.state = {
      tokens: [],
      form: {
        name: ``,
        limit: ``,
        isHard: false,
        spent: 0,
        period: `weekly`,
        categories: []
      }
    };
  }

  componentWillMount() {
    const { appContext } = this.props;

    appContext.setHeaderTitle(`Pocket`);
  }

  componentDidMount() {
    const { appContext } = this.props;
    const { form } = this.state;

    const categories = [];

    appContext.categories.forEach(category => {
      category.isSelected = false;
      categories.push(category);
    });

    form.categories = categories;

    this.setState({ form });
  }

  save = navigation => {
    const { appContext } = this.props;
    const { tokens } = this.state;

    appContext.setTokens(tokens);

    navigation.navigate(`Tutorial1`);
  };

  setLimit = newIsHard => {
    const { form } = this.state;

    form.isHard = newIsHard;
    this.setState({ form });
  };

  handleSubmit = () => {
    const { form } = this.state;
    const { appContext, navigation } = this.props;

    const selectedCategories = [];
    form.categories.forEach(category => {
      if (category.isSelected) {
        selectedCategories.push(category);
      }
    });

    form.categories = selectedCategories;

    appContext.createPocket(form);

    navigation.navigate(`Index`);
  };

  setCategorySelected = index => {
    const { categories } = this.state.form;

    categories[index].isSelected = !categories[index].isSelected;

    this.setState({ categories });
  };

  handleTextChange = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    form.categories = this.state.form.categories;

    this.setState({ form });
  };

  render() {
    const { appContext } = this.props;
    const { form } = this.state;

    return (
      <>
        <NavigationEvents
          onWillFocus={() => appContext.setHeaderTitle(`Create new pocket`)}
        />

        <ScrollView
          contentContainerStyle={[
            tw.wFull,
            tw.minHFull,
            tw.relative,
            tw.flex,
            tw.itemsStretch,
            tw.p4,
            tw.bgCream,
            tw.pT32
          ]}
        >
          <View>
            <Text style={[tw.fontSemibold, tw.textXl, tw.mB3]}>
              Pocket name
            </Text>

            <TextInput
              style={[tw.roundedFull, tw.bgWhite, tw.opacity75, tw.p4, tw.mB2]}
              placeholder="'Partying'"
              onChangeText={text => this.handleTextChange(`name`, text)}
              value={form.name}
            />

            <Text
              style={[tw.mL1, tw.fontLight, tw.textXs, tw.opacity75, tw.mB6]}
            >
              Name your pocket something meaningful to you.
            </Text>

            <Text style={[tw.fontSemibold, tw.textXl, tw.mB3]}>Categories</Text>

            <View
              style={[
                tw.flex,
                tw.flexRow,
                tw.flexWrap,
                tw.justifyBetween,
                tw.itemsStretch
              ]}
            >
              {appContext.categories.map((category, index) => {
                const categoryIndex = index;
                if (form.categories && index < form.categories.length) {
                  category.isSelected = form.categories[index].isSelected;

                  return (
                    <TouchableOpacity
                      key={categoryIndex}
                      style={[tw.w1_3, tw.h8, tw.mY2]}
                      onPress={() => this.setCategorySelected(categoryIndex)}
                    >
                      <SelectableCategory category={category} />
                    </TouchableOpacity>
                  );
                }

                return false;
              })}
            </View>

            <Text
              style={[
                tw.mL1,
                tw.mT1,
                tw.fontLight,
                tw.textXs,
                tw.opacity75,
                tw.mB2
              ]}
            >
              Transactions from these categories will come out of this pocket.
            </Text>

            <Text style={[tw.fontSemibold, tw.textXl, tw.mB3, tw.mT4]}>
              Spend limit
            </Text>

            <TextInput
              style={[tw.roundedFull, tw.bgWhite, tw.opacity75, tw.p4, tw.mB3]}
              keyboardType="numeric"
              placeholder="($) Spend limit"
              onChangeText={limit => this.handleTextChange(`limit`, limit)}
              value={form.limit}
              maxLength={10}
            />

            <Text
              style={[tw.mL1, tw.fontLight, tw.textXs, tw.opacity75, tw.mB6]}
            >
              What&apos;s your weekly spending limit for this pocket?
            </Text>

            <Text style={[tw.fontSemibold, tw.textXl, tw.mB3]}>Hard limit</Text>

            <View style={[tw.flex, tw.flexRow, tw.itemsCenter]}>
              <Switch
                onValueChange={() => {
                  this.setLimit(!form.isHard);
                }}
                value={form.isHard}
              />

              <View style={[tw.flex, tw.flexRow, tw.mX1]}>
                <Icon
                  style={[tw.mX2]}
                  weight
                  name="question-circle"
                  size={16}
                  color="#000"
                />

                <Text style={[tw.fontLight, tw.textXs]}>
                  Will reject transactions if spend limit is exceeded.
                </Text>
              </View>
            </View>

            <View style={[tw.mT8, tw.flex, tw.flexRow, tw.justifyCenter]}>
              <CustomButton
                onPress={this.handleSubmit}
                style={[tw.mT8, tw.bgWhite, tw.w3_4, tw.p4, tw.roundedLg]}
              >
                <Text style={[tw.text2xl, tw.wFull, tw.textCenter]}>
                  Create pocket
                </Text>
              </CustomButton>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const AddPocketView = props => {
  const { navigation } = props;

  return (
    <AppContext.Consumer>
      {appContext => {
        return (
          <AddPocketViewComponent
            appContext={appContext}
            navigation={navigation}
          />
        );
      }}
    </AppContext.Consumer>
  );
};

export default AddPocketView;
