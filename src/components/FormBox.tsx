import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import '../style/FormBox.css';
// import Menu from './Menu';
import { Dropdown } from 'semantic-ui-react';


/**
 * This is the User Form component.
 */

interface FuncProps {
 changeStart(isOne: boolean, city: any): any;
 changeLetter(letter: string, person: string): any;
 changeDestination(isOne: boolean, destinationCity: any): any;
 callAPI(): any;
 startCityList: {
    text: string, 
    key: string,
    value: string,
  }[];
 inputValue1: string;
 inputValue2: string;
 destinationCity: string;
}

class FormBox extends React.Component <FuncProps> {

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
    this.props.changeLetter(letter, myInput);
    
    let divd = document.getElementById("myDropdown");
    a = (divd as HTMLFormElement).getElementsByTagName("a");
    for (let i:number  = 0; i < a.length; i++) {
      var txtValue:string = a[i].textContent || a[i].innerText;
      if ((txtValue.toUpperCase().indexOf(filterLetter) > -1) && (filterLetter.length >= 3) ){
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  
  render() {
    return (
      <div className="outer">
        {/* <Form inline> */}
          <Container fluid={true} className="myDropdown">
            <Row>
              <Col className="padding">
                <Dropdown
                  id="myInput"
                  type="text"
                  placeholder="Airport 1"
                  className='icon'
                  icon='search'
                  selectOnNavigation={false}
                  fluid
                  search
                  selection
                  options={this.props.startCityList}
                  onChange={ (_, data) => this.props.changeStart(true, data.value) }
                  onClick={() => this.props.callAPI()}
                />
                {/* <Dropdown className="padding">
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    <FormControl 
                      type="text" 
                      placeholder="Your Airport"
                      className="padding mr-sm-2" 
                      id="myInput"
                      value={this.props.inputValue1}
                      onChange={() => this.filter("myInput")}
                    />
                  </Dropdown.Toggle>
                  {(this.props.inputValue1.length >= 3 ) &&
                    <Menu 
                      changeStart={this.props.changeStart}
                      isOne={true} 
                      startCityList={this.props.startCityList}
                      inputValue={this.props.inputValue1}
                      callAPI={this.props.callAPI}
                      // cityCoords={this.props.cityCoords}
                      // updateStartCity={this.props.updateStartCity}
                      //startCity={this.props.startCity}
                    />
                  }
                </Dropdown> */}
            </Col>
            <Col className="padding">
            <Dropdown
                  id="myInput2"
                  type="text"
                  placeholder="Airport 2"
                  className='icon'
                  icon='search'
                  selectOnNavigation={false}
                  fluid
                  search
                  selection
                  options={this.props.startCityList}
                  onChange={ (_, data) => this.props.changeStart(false, data.value) }
                  onClick={() => this.props.callAPI()}
                />
            {/* <Dropdown className="padding">
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                 <FormControl 
                  type="text" 
                  placeholder="Friend's Airport" 
                  className="padding mr-sm-2" 
                  id="myInput2"
                  value={this.props.inputValue2}
                  onChange={() => this.filter("myInput2")}
                  onClick={() => this.props.callAPI}
                />
                </Dropdown.Toggle>
                {(this.props.inputValue2.length >=3 ) &&
                  <Menu 
                    changeStart={this.props.changeStart}
                    isOne={false} 
                    startCityList={this.props.startCityList}
                    inputValue={this.props.inputValue2}
                    callAPI={this.props.callAPI}
                    // cityCoords={this.props.cityCoords}
                    // updateStartCity={this.props.updateStartCity}
                    //startCity={this.props.startCity}
                  />
                }
            </Dropdown> */}
            </Col>
            </Row>
            <Row>
            <Col className="padding">
            <Dropdown
                  id="myInput3"
                  type="text"
                  placeholder="Destination"
                  className='icon'
                  icon='search'
                  selectOnNavigation={false}
                  fluid
                  search
                  selection
                  options={this.props.startCityList}
                  onChange={(_, data) => this.props.changeDestination(true, data.value)}
                  onClick={() => this.props.callAPI()}
                />
            {/* <Dropdown className="padding">
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                 <FormControl 
                  type="text" 
                  placeholder="Destination" 
                  className="padding mr-sm-2" 
                  id="myInput3"
                  value={this.props.destinationCity}
                  onChange={() => this.filter("myInput3")}
                  onClick={() => this.props.callAPI}
                />
                </Dropdown.Toggle>
                {(this.props.destinationCity.length >=3 ) &&
                  <Menu 
                    changeStart={this.props.changeDestination} 
                    isOne={false} 
                    startCityList={this.props.startCityList}
                    inputValue={this.props.destinationCity}
                    callAPI={this.props.callAPI}
                  />
                }
            </Dropdown> */}
            </Col>
            </Row>
          </Container>
        {/* </Form> */}
      </div>
    );
  }
}

export default FormBox;