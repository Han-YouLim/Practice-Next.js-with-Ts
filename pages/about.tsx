import styles from "../styles/Home.module.css"
import Head from "next/head"
import { Card, Icon, Image, Form, Checkbox, Button } from 'semantic-ui-react'

export default function About () {
    return(
        <div className={styles.container}>
            <Head>
                <title>ABOUT | JERRY Market </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.aboutMain}>
                <h1><section style={{color:"red"}}>About</section></h1>
                <hr className={styles.solid}></hr>
                <Card>
                    <Image src='/images/jerry2.jpeg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Jerry</Card.Header>
                        <Card.Meta>Borned in 2020</Card.Meta>
                        <Card.Description>
                            Jerry is a dog living in Seoul, South Korea.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            10,000 Friends
                        </a>
                    </Card.Content>
                </Card>
                <h1><section style={{color:"red"}}>Contact</section></h1>
                <hr className={styles.solid}></hr>
                <br/>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </main>
        </div>
    )
}