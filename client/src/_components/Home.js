
import React, { useEffect } from "react"
import { Card, Button, CardTitle, CardText, Row, Col, CardImg } from 'reactstrap'
import { getCookie } from 'react-use-cookie'
import { useUserActions } from '_actions'

const Home = ({ history }) => {
  const userActions = useUserActions()
  useEffect(() => {
    // redirect to login if already logged in
    async function authSession() {
      const sesh = getCookie('token')
      if (sesh === '0') {
        console.log('Login sesh: ', sesh)
        history.push('/login')
        return
      }
      const valid = await userActions.authSession(sesh)
      console.log('Home auth: ', valid)
      if (!valid) {
        history.push('/login')
      }
    }

    authSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }
  return (
    <div>
      <Row>
        <Col sm="6">
          <Card body>
            <CardImg top width="100%" src={`https://picsum.photos/seed/${getRandomInt(100)}/300/200`} alt="image cap" />
            <CardTitle>Agent List</CardTitle>
            <CardText>Agent information and stats.</CardText>
            <a href="/agents">
              <Button>Agents</Button>
            </a>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardImg top width="100%" src={`https://picsum.photos/seed/${getRandomInt(100)}/300/200`} alt="image cap" />
            <CardTitle>Transaction List</CardTitle>
            <CardText>Complete list of transctions.</CardText>
            <a href="/transactions">
              <Button>Transactions</Button>
            </a>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
