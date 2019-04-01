import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import IconCute from '../cute.png'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        var { data } = this.props
        var hp = this.setHp(data.hp)
        var str = this.setAttacks(data.attacks)
        var weak = this.setWeak(data.weaknesses)
        var damage = this.setDamage(data.attacks)
        var level = this.setLevel(hp, damage, weak)
        this.setState({ hp, str, weak, damage, level })
    }

    setHp(hp) {
        return hp > 100 ? 100 : hp
    }

    setAttacks(attacks) {
        if (attacks !== undefined) {
            if (attacks.length === 1) {
                return 50
            } else {
                return 100
            }
        }
        return 0
    }

    setWeak(weak) {
        if (weak !== undefined) {
            if (weak.length === 1) {
                return 100
            }
        }
        return 0
    }

    setDamage(attacks) {
        if (attacks !== undefined) {
            let Damage = 0
            for (var attack in attacks) {
                if (parseInt(attacks[attack].damage)) {
                    Damage += parseInt(attacks[attack].damage)
                }
            }
            return Damage
        }
        return 0
    }

    setLevel(hp, damage, weak) {
        var dataWeak = 0
        if (weak === 100) dataWeak = 1
        return Math.ceil(((hp / 10) + (damage / 10) + 10 - (dataWeak)) / 5)
    }

    renderHappiness(level) {
        let happines = []
        for (let i = 0; i < level; i++) {
            happines.push(<img src={IconCute} style={{ width: 30, height: 30, margin: 1 }} />)
        }
        return happines
    }

    render() {
        var { data, setListCard, text } = this.props
        var { hp, str, weak, damage, level } = this.state
        return (
            <div id="card" style={{ margin: 10, paddingLeft: 16, paddingRight: 16 }}>
                <Row style={{ padding: 8, backgroundColor: '#f3f4f7' }} >
                    <Col xs="4"><img src={data.imageUrl} style={{ width: 120, height: 180 }}></img></Col>
                    <Col xs="6">
                        <h4>{data.name} </h4>
                        <Row >
                            <Col xs="5">
                                <h6>HP </h6>
                                <h6>STR</h6>
                                <h6>WEAK</h6>
                                <h6>DAMAGE</h6>
                            </Col>
                            <Col xs="2">
                                <h6><progress max="100" min="0" value={hp} id="bar" ></progress></h6>
                                <h6><progress max="100" min="0" value={str} id="bar" ></progress></h6>
                                <h6><progress max="100" min="0" value={weak} id="bar" ></progress></h6>
                                <h6><progress max="100" min="0" value={damage} id="bar" ></progress></h6>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: 0, flexWrap: 'nowrap' }}>
                            {this.renderHappiness(level)}
                        </Row>
                    </Col>
                    <div class="showme" >
                        <button onClick={() => {setListCard(data)}}>
                            <h3>{text}</h3>
                        </button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default Card
