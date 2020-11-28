import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ spec, mathData }) => ({
    spec,
    mathData
});

class InfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.filledInfoBar = this.filledInfoBar.bind(this);
        this.emptyInfoBar = this.emptyInfoBar.bind(this);
    }

    render() {
        const props = this.props;
        return (<div className="b-app-info-bar">
            {props.spec && props.spec.room ? (<React.Fragment>
                {this.filledInfoBar()}
            </React.Fragment>) : (<React.Fragment>
                {this.emptyInfoBar()}
            </React.Fragment>)}
        </div>);
    }

    filledInfoBar() {
        const props = this.props;
        let freeSpace = 'N/A';

        if (props.mathData && props.mathData.freeSpace) {
            freeSpace = parseFloat(props.mathData.freeSpace, 10);
            freeSpace = freeSpace.toFixed(2);
        }

        return (<React.Fragment>
            <div className="b-app-info">
                <div className="b-app-info-section freeSpace">
                    <span className="sign">Free space of the room:</span>
                    <span className="value">{freeSpace} square meters</span>
                </div>
                <div className="b-app-info-section elements">
                    {props.spec.rect && !!props.spec.rect.length && (<div className="b-app-info-section rect">
                            <div className="b-app-info-subsection">Rectangles:</div>
                            <ol>
                                {props.spec.rect.map((element, i) => {
                                    const key = 'rect' + i;
                                    return (<li key={key}>
                                        <div className="info">xo: {element.x0}, yo: {element.y0}, width: {element.w}, length: {element.l}</div>
                                        {element.collisionWithElement && (<div className="element-collision b-app-errored">Element has collision with another room element.</div>)}
                                        {element.outOfWalls && !!element.outOfWalls.length && (<div className="element-wall-collision b-app-errored">
                                            Element is beyound of such walls:
                                            <ul>
                                                {element.outOfWalls.map((wall, j) => {
                                                    const key = 'rectWall' + j;
                                                    return (<li key={key}>{wall}</li>);
                                                })}
                                            </ul>
                                        </div>)}
                                    </li>);
                                })}
                            </ol>
                        </div>)}
                    {props.spec.triangle && !!props.spec.triangle.length && (<div className="b-app-info-section triangle">
                            <div className="b-app-info-subsection">Triangles:</div>
                            <ol>
                                {props.spec.triangle.map((element, i) => {
                                    const key = 'triangle' + i;
                                    return (<li key={key}>
                                        <div className="info">xo: {element.x0}, yo: {element.y0}, triangle width: {element.l}</div>
                                        {element.collisionWithElement && (<div className="element-collision b-app-errored">Element has collision with another room element.</div>)}
                                        {element.outOfWalls && !!element.outOfWalls.length && (<div className="element-wall-collision b-app-errored">
                                            Element is beyound of such walls:
                                            <ul>
                                                {element.outOfWalls.map((wall, j) => {
                                                    const key = 'triangleWall' + j;
                                                    return (<li key={key}>{wall}</li>);
                                                })}
                                            </ul>
                                        </div>)}
                                    </li>);
                                })}
                            </ol>
                        </div>)}
                    {props.mathData.hasErrors && (<div className="b-app-info-section b-app-errored generalErrorInfo">
                        At least, one of elements is beyond the walls or overlaps other elements. Please, reorganize the room space to have correct free space results.
                    </div>)}
                </div>
            </div>
        </React.Fragment>);
    }

    emptyInfoBar() {
        return (<React.Fragment>
            <div className="b-app-info b-app-errored">No info is available. Probably you didn't define a spec for room.</div>
        </React.Fragment>);
    }
}

export default connect(mapStateToProps)(InfoBar);
