import React from 'react'
import { Card, Button, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap'

const Home = (props) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }
  return (
    <div>
      <Row>
        <Col sm="6">
          <Card body>
            <CardImg top width="100%" src={`https://picsum.photos/seed/${getRandomInt(100)}/300/200`} alt="image cap" />
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <a href="/agents">
              <Button>Agents</Button>
            </a>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardImg top width="100%" src={`https://picsum.photos/seed/${getRandomInt(100)}/300/200`} alt="image cap" />
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <a href="/agents">
              <Button>Transactions</Button>
            </a>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
