import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import * as fi from "react-icons/fi";

const TableCard = ({ productsColumns, posts }) => {
  const [footer, setFooter] = useState(-1);
  console.log(productsColumns);
    console.log(posts)


  return (
    <>
      {
        posts.map((post,i) => (
            i % 3 ===0 &&
            <CardGroup>
            {posts[i] &&<Card className="m-2" style={{height:"fit-content"}}>
            <Card.Header>
              <button
                className="cardHeaderBtn"
                onClick={() => {
                  footer === -1
                    ? setFooter(i)
                    : footer === i
                    ? setFooter(-1)
                    : setFooter(i);
                }}
              >
                <fi.FiMenu />
              </button>
            </Card.Header>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            {(footer === i) && (
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            )}
          </Card>}
            {posts[i+1] &&<Card className="m-2" style={{height:"fit-content"}}>
            <Card.Header>
              <button
                className="cardHeaderBtn"
                onClick={() => {
                  footer === -1
                    ? setFooter(i+1)
                    : footer === i+1
                    ? setFooter(-1)
                    : setFooter(i+1);
                }}
              >
                <fi.FiMenu />
              </button>
            </Card.Header>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            {(footer === i+1) && (
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            )}
          </Card>}
            {posts[i+2] &&<Card className="m-2" style={{height:"fit-content"}}>
            <Card.Header>
              <button
                className="cardHeaderBtn"
                onClick={() => {
                  footer === -1
                    ? setFooter(i+2)
                    : footer === i+2
                    ? setFooter(-1)
                    : setFooter(i+2);
                }}
              >
                <fi.FiMenu />
              </button>
            </Card.Header>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            {(footer === i+2) && (
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            )}
          </Card>}

      </CardGroup>
        ))
      }
 
    </>
  );
};

export default TableCard;
