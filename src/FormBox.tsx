import React from 'react';
import { Form, FormControl, Button, Dropdown, Container, Row, Col } from 'react-bootstrap'; 
import './FormBox.css';

/**
 * This is the User Form component.
 */

 // TODO when I click on the button, the location on the map will change
 
class FormBox extends React.Component {
  // When the user clicks on the button,
  // toggle between hiding and showing the dropdown content
  
  searchFunc() {
    let search = document.getElementById("myDropdown")
    if(search) (search as HTMLFormElement).classList.toggle("show"); 
    console.log(search);
  }
  filter(myInput:string) {
    var filterLetter: string = "";
    var a: HTMLCollectionOf<HTMLAnchorElement>;
    let input = document.getElementById(myInput);
    if(input) {
        filterLetter = (input as HTMLFormElement).value.toUpperCase()
    };
    console.log(filterLetter);
    let divd = document.getElementById("myDropdown");
    a = (divd as HTMLFormElement).getElementsByTagName("a")
    for (let i:number  = 0; i < a.length; i++) {
        var txtValue:string = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filterLetter) > -1) {
        a[i].style.display = "";
        } else {
        a[i].style.display = "none";
        }
    }
  }
  changeLocations(): number[] {
    let startPlace: number[] =[-3.7025600, 40.4165000];
    return startPlace;
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
                  className="padding mr-sm-2" 
                  onKeyUp={() => this.filter("myInput")} 
                  id="myInput" 
                />
              </Dropdown.Toggle>
              <Button variant="outline-info" onClick={this.searchFunc}>Choose</Button>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.changeLocations}>Zurich</Dropdown.Item>
                <Dropdown.Item onClick={this.changeLocations}>Madrid</Dropdown.Item>
                <Dropdown.Item onClick={this.changeLocations}>Los Angeles</Dropdown.Item>
              </Dropdown.Menu>
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
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.changeLocations}>Zurich</Dropdown.Item>
                <Dropdown.Item onClick={this.changeLocations}>Madrid</Dropdown.Item>
                <Dropdown.Item onClick={this.changeLocations}>Los Angeles</Dropdown.Item>
              </Dropdown.Menu>
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