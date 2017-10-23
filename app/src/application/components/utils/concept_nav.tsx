import * as React from 'react'
import Measure from 'react-measure'
import {
    Button,
} from '@blueprintjs/core'

import {ConceptGraph} from '../d3Blocks/conceptGraph'

import {Concept} from '../../types'

interface Props {
    nodes: any,
    links: any,
}

interface State {
    searchedConcept?: string,
    dimensions: any,
    toggle: boolean,
}

export class ConceptNav extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            dimensions: {
                width: 0,
                height: 0,
            },
            toggle: false,
        }
    }

    updateState(event: any) {
        this.setState({
            ...this.state,
            searchedConcept: event.target.value,
        })
    }

    toggle() {
        this.setState({
            ...this.state,
            toggle: !this.state.toggle,
        })
    }

    render() {
        const {nodes, links} = this.props;
        const {searchedConcept} = this.state;

        const length = searchedConcept ? searchedConcept.length : 0

        return (
            <Measure
                bounds
                onResize={(contentRect: any) => {
                    this.setState({
                        dimensions: contentRect.bounds,
                    })
                }}
            >
                {
                    ({ measureRef } : any) =>
                        <div
                            ref={measureRef}
                            className={'block-2'}
                            style={{
                                padding: 0
                            }}
                        >
                            <Button
                                className={'pt-minimal'}
                                onClick={this.toggle}
                                text={'Toggle'}
                            />

                            <div className='pt-input-group concept_nav_bar'>
                                <span className={'pt-icon pt-icon-search'}></span>
                                <input
                                    className={'pt-input'}
                                    placeholder={'Concept (ex: Chômage)'}
                                    dir='auto'
                                    value={searchedConcept}
                                    onChange={this.updateState.bind(this)}
                                />
                            </div>

                            <ConceptGraph
                                version={nodes.length + this.state.dimensions.width + length}
                                searchedConcept={searchedConcept}
                                nodes={nodes}
                                links={links}
                                labels={nodes}
                                width={this.state.dimensions.width}
                                height={window.innerHeight / 2}
                            />
                        </div>
                }
            </Measure>
        )
    }
}
