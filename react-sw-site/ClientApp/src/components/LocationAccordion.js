import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocationAccordion = (props) => {
    const { location, index, serviceTags, onAccordionHeaderClick } = props;
    const eventKey = index.toString();

    return (
        <Card style={{ marginBottom: '10px' }}>
            <Accordion.Item eventKey={eventKey} id={`accordion-item-${index}`}>
                <Accordion.Header
                    onClick={() => onAccordionHeaderClick(location.longitude, location.latitude, index)}
                    eventKey={eventKey}
                >
                    {location.loc_Name}
                </Accordion.Header>
                <Accordion.Body>
                    <div>
                        <strong>Address:</strong> {location.loc_Address}
                    </div>
                    <div>
                        <strong>Phone Number:</strong> {location.phone_Num}
                    </div>
                    <div>
                        <strong>Service Tags:</strong>{' '}
                        {location.service_Tags
                            .split(',')
                            .map((tag) => serviceTags[parseInt(tag, 10)])
                            .join(', ')}
                    </div>
                    <div>
                        <div className="col">
                            <Link to={`/ContactDetails/${location.id}`}>Details</Link>
                        </div>
                        <div className="col">
                            <Link to={`/EditData/${location.id}`}>Edit</Link>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Card>
    );
};

export default LocationAccordion;
