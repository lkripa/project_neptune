import React from 'react';
import { Form, FormControl, Button, Dropdown, Container, Row, Col } from 'react-bootstrap'; 
import './FormBox.css';
import Menu from './DropDownMenu';

/**
 * This is the User Form component.
 */

 // TODO: when city is clicked, the form fills in with the city

interface FuncProps {
 changeStart(points: number[], isOne: boolean): any;
}

class FormBox extends React.Component <FuncProps> {


  searchFunc() {
    let search = document.getElementById("myDropdown");
    console.log(search);
  }

  // Filter letters when user types into form
  filter(myInput:string) {
    var filterLetter: string = "";
    var a: HTMLCollectionOf<HTMLAnchorElement>;
    let input = document.getElementById(myInput);
    if(input) {
      filterLetter = (input as HTMLFormElement).value.toUpperCase();
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
                      onKeyUp={() => this.filter("myInput")} 
                      id="myInput" 
                    />
                  </Dropdown.Toggle>
                  <Button variant="outline-info" onClick={this.searchFunc}>Choose</Button>
                  <Menu changeStart={this.props.changeStart} isOne={true} />
                </Dropdown>
            </Col>
            <Col>
            <Dropdown className="padding">
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                 <FormControl 
                  type="text" 
                  placeholder="Friend's Airport" 
                  className="padding mr-sm-2" 
                  onKeyUp={() => this.filter("myInput2")} 
                  id="myInput2"
                  />
                </Dropdown.Toggle>
                <Button variant="outline-info" onClick={this.searchFunc}>Choose</Button> 
                <Menu changeStart={this.props.changeStart} isOne ={false} />
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