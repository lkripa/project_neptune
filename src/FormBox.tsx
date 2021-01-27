import React from 'react';
import { Form, FormControl, Dropdown, Container, Row, Col } from 'react-bootstrap'; 
import './FormBox.css';
import Menu from './DropDownMenu';

/**
 * This is the User Form component.
 */

 // TODO: add Enter key to also act as "select" button

interface FuncProps {
 changeStart(points: number[], isOne: boolean): any;
}

interface FormState {
  inputValue1: string;
  inputValue2: string;
}
class FormBox extends React.Component <FuncProps, FormState> {
  constructor(props: FuncProps) {
    super(props);
    this.state = {
      inputValue1: "",
      inputValue2: ""
    }
  }
  // change city on text field form
  changeCity = (city: string, isOne: boolean) => {
    if (isOne) {
      this.setState({inputValue1: city}, () => 
      console.log("city:", this.state.inputValue1
    ));
    } else {
      this.setState({inputValue2: city}, () => 
      console.log("city:", this.state.inputValue2
    ));
    }
  }

  // Filter letters when user types into form
  filter = (myInput:string) => {
    var filterLetter: string = "";
    var letter: string = "";
    var a: HTMLCollectionOf<HTMLAnchorElement>;
    let input = document.getElementById(myInput);
    if(input) {
      letter = (input as HTMLFormElement).value;
      filterLetter = (input as HTMLFormElement).value.toUpperCase();
    }
    if (myInput === "myInput") {
      this.setState({
        inputValue1: letter
      })
      console.log(this.state.inputValue1);
    } else {
      this.setState({
        inputValue2: letter
      })
      console.log(this.state.inputValue2);
    }
    
    let divd = document.getElementById("myDropdown");
    a = (divd as HTMLFormElement).getElementsByTagName("a");
    for (let i:number  = 0; i < a.length; i++) {
      var txtValue:string = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filterLetter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  
  render() {
    return (
      <div>
        <Form inline>
          <Container id="myDropdown">
            <Row>
              <Col>
                <Dropdown className="padding">
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    <FormControl 
                      type="text" 
                      placeholder="Your Airport"
                      className="padding mr-sm-2 formColor" 
                      id="myInput"
                      value={this.state.inputValue1}
                      onChange={() => this.filter("myInput")}
                    />
                  </Dropdown.Toggle>
                  <Menu changeStart={this.props.changeStart} isOne={true} changeCity={this.changeCity}/>
                </Dropdown>
            </Col>
            <Col>
            <Dropdown className="padding">
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                 <FormControl 
                  type="text" 
                  placeholder="Friend's Airport" 
                  className="padding mr-sm-2" 
                  id="myInput2"
                  value={this.state.inputValue2}
                  onChange={() => this.filter("myInput2")}
                  />
                </Dropdown.Toggle>
                <Menu changeStart={this.props.changeStart} isOne={false} changeCity={this.changeCity}/>
            </Dropdown>
            </Col>
            </Row>
          </Container>
        </Form>
      </div>
    );
  }
}

export default FormBox;