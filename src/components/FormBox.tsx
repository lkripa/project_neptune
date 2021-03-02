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
//  changeLetter(letter: string, person: string): any;
 changeDestination(isOne: boolean, destinationCity: any): any;
 callAPI(): any;
 startCityList: {
    text: string, 
    key: string,
    value: string,
  }[];
//  inputValue1: string;
//  inputValue2: string;
//  destinationCity: string;
}

class FormBox extends React.Component <FuncProps> {
  
  render() {
    return (
      <div className="outer">
          <Container fluid={true} className="myDropdown">
            <Row>
              <Col className="padding">
                <Dropdown
                  id="myInput"
                  placeholder="Airport City 1"
                  icon='search'
                  selectOnNavigation={false}
                  lazyLoad
                  fluid
                  search
                  selection
                  clearable
                  minCharacters={3}
                  options={this.props.startCityList}
                  onChange={ (_, data) => this.props.changeStart(true, data.value) }
                  onClick={() => {
                    this.props.callAPI(); 
                    this.props.changeStart(true, "");
                  }}
                />
            </Col>
            <Col className="padding">
            <Dropdown
                  id="myInput2"
                  placeholder="Airport City 2"
                  icon='search'
                  selectOnNavigation={false}
                  lazyLoad
                  fluid
                  search
                  selection
                  clearable
                  minCharacters={3}
                  options={this.props.startCityList}
                  onChange={ (_, data) => this.props.changeStart(false, data.value) }
                  onClick={() => {
                    this.props.callAPI();
                    this.props.changeStart(false, "");
                  }}
                />
            </Col>
            </Row>
            <Row>
            <Col className="padding">
            <Dropdown
              id="myInput3"
              placeholder="Destination City"
              icon='search'
              selectOnNavigation={false}
              lazyLoad
              fluid
              search
              selection
              clearable
              minCharacters={3}
              options={this.props.startCityList}
              onChange={(_, data) => this.props.changeDestination(true, data.value)}
              onClick={() => {
                this.props.callAPI(); 
                this.props.changeDestination(true, "");
              }}
            />
            </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default FormBox;