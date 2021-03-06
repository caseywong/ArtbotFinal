import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image,
  Button, TouchableOpacity, Alert, Dimensions,
  AsyncStorage} from 'react-native';

import { Images, Colors, Metrics } from '../../Themes'
import ChatBot from 'react-native-chatbot';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

import { addCiq } from '../../Actions/DisasterpieceActions';

class ChatbotScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goHome(){
    this.props.navigation.navigate('HomeScreen');
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const fromCanvas = navigation.getParam("fromCanvas");
    if (fromCanvas) {
        return {
            headerTitle: 'Chatbot',
            headerStyle: { backgroundColor: 'deepskyblue' },
            headerLeft: <Ionicons name={'ios-home'}
              size={25}
              onPress= {() => navigation.navigate('HomeScreen') }
              color="#fff"
              style= {{padding:10}}
            />
        };
    } else {
        return {
            headerTitle: 'Chatbot',
            headerStyle: { backgroundColor: 'deepskyblue' },
        };
    }
  };


  state = {
    creativeIQ: 0,
  };

  calculateCreativeIQ(data){
    var sum = 0;
    for (i=0; i < data.values.length; i++){
      if(Number.isInteger(data.values[i])){
        sum = sum + data.values[i];
      }
    }
    this.setState({creativeIQ:sum});
    var img = this.props.navigation.getParam("img", "anon");
    this.props.addCiq(img, sum);
  }

  render() {
    const { navigation } = this.props;

    const steps = [
      {
        id: 'Intro',
        message: 'Hi! Artbot here.',
        trigger: 'IntroQuestion',
      },
      {
        id: 'IntroQuestion',
        message: 'First tell me how you are feeling!',
        trigger: 'IntroResponse'
      },
      {
        id: 'IntroResponse',
        options: [
          { value: 1, label: 'Not So Good', trigger: 'IntroInquiryBad' },
          { value: 5, label: 'Ok', trigger: 'IntroInquiryBad' },
          { value: 10, label: 'Good!', trigger: 'IntroInquiryGood' },
        ],
      }, {
        id: 'IntroInquiryBad',
        message: "Oh, I'm sorry to hear that! How come?",
        trigger: 'IntroInquiryResponse',
      }, {
        id: 'IntroInquiryGood',
        message: "Thats fantastic! Tell me more!",
        trigger: 'IntroInquiryResponse'
      }, {
        id: 'IntroInquiryResponse',
        user: true,
        trigger: 'ProudQuestion',
      },  {
        id: 'ProudQuestion',
        message: 'Thank you for letting me know. I was wondering if you could tell me how proud you are of your disasterpiece?',
        trigger: 'ProudResponse'
      }, {
        id: 'ProudResponse',
        options: [
          { value: 1, label: 'Not Very Proud', trigger: 'ProudInquiryBad' },
          { value: 5, label: 'Somewhat Proud', trigger: 'ProudInquiryBad' },
          { value: 10, label: 'Very Proud', trigger: 'ProudInquiryGood' },
        ],
      }, {
        id: 'ProudInquiryBad',
        message: "Is there a particular reason why?",
        trigger: 'ProudInquiryResponse',
      }, {
        id: 'ProudInquiryGood',
        message: "I'm so glad to hear that! What are you proud of?",
        trigger: 'ProudInquiryResponse',
      }, {
        id: 'ProudInquiryResponse',
        user: true,
        trigger: 'SatisfiedQuestion'
      }, {
        id: 'SatisfiedQuestion',
        message: 'Interesting! How satisified are you with your art?',
        trigger: 'SatisfiedResponse'
      }, {
        id: 'SatisfiedResponse',
        options: [
          { value: 1, label: 'Not Very Satisfied', trigger: 'SatisfiedInquiryBad' },
          { value: 5, label: 'Somewhat Satisfied', trigger: 'SatisfiedInquiryBad' },
          { value: 10, label: 'Very Satisfied', trigger: 'SatisfiedInquiryGood' },
        ],
      }, {
        id: 'SatisfiedInquiryBad',
        message: "How come?",
        trigger: 'SatisfiedInquiryResponse',
      }, {
        id: 'SatisfiedInquiryGood',
        message: "That's great! What was satisifying in particular?",
        trigger: 'SatisfiedInquiryResponse',
      }, {
        id: 'SatisfiedInquiryResponse',
        user: true,
        trigger: 'CreativeQuestion'
      },  {
        id: 'CreativeQuestion',
        message: 'Thank you for telling me! I was also wondering, how creative did you feel during this session?',
        trigger: 'CreativeResponse'
      }, {
        id: 'CreativeResponse',
        options: [
          { value: 1, label: 'Not Very Creative', trigger: 'CreativeInquiryBad' },
          { value: 5, label: 'Somewhat Creative', trigger: 'CreativeInquiryBad' },
          { value: 10, label: 'Very Creative', trigger: 'CreativeInquiryGood' },
        ],
      }, {
        id: 'CreativeInquiryBad',
        message: "Hmm. Is there a reason you didn't feel creative?",
        trigger: 'SatisfiedInquiryResponse',
      }, {
        id: 'CreativeInquiryGood',
        message: "That's great! In what moments did you feel particularly creative?",
        trigger: 'CreativeInquiryResponse',
      }, {
        id: 'CreativeInquiryResponse',
        user: true,
        trigger: 'AdaptiveQuestion'
      },  {
        id: 'AdaptiveQuestion',
        message: 'That\'s good to know! Finally, it would be great to know what you thought of my interuptions. How were they?',
        trigger: 'FeedbackResponse'
      }, {
        id: 'FeedbackResponse',
        options: [
          { value: 0, label: 'Didn\'t like them', trigger: 'FeedbackInquiryBad' },
          { value: 5, label: 'Liked them', trigger: 'FeedbackInquiryBad' },
          { value: 10, label: 'Loved them', trigger: 'FeedbackInquiryGood' },
        ],
      }, {
        id: 'FeedbackInquiryBad',
        message: "Gotcha! Do you have any particular issues or commentary?",
        trigger: 'FeedbackInquiryResponse',
      }, {
        id: 'FeedbackInquiryGood',
        message: "I'm glad! What would you like more of?",
        trigger: 'FeedbackInquiryResponse',
      }, {
        id: 'FeedbackInquiryResponse',
        user: true,
        trigger: 'Goodbye'
      }, {
        id: 'Goodbye',
        message: 'Thanks for taking the time to check in. I will calculate your creative IQ based on your responses. Can\'t wait to talk to you again soon!',
        end: true,
      }
    ];

    return (
      <View style={styles.container}>
        <ChatBot
          handleEnd={(value) => this.calculateCreativeIQ(value)}
          steps={steps}
          botBubbleColor="deepskyblue"
          userDelay={200}/>

      </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  titleContainer: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center'
  },
  chatbotTitle: {
    fontSize: 35,
    textDecorationLine: 'underline',
    backgroundColor: 'deepskyblue'
  },
  chatbotContainer: {
    flex: 1,
    width: 0.9 * SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
});

const mapDispatchToProps = (dispatch) => {
    return {
        addCiq: (img, ciq) => { dispatch(addCiq(img, ciq)); }
    };
}

export default connect(null, mapDispatchToProps)(ChatbotScreen);
