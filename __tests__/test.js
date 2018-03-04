// __tests__/Intro-test.js
import React from 'react';
import App from '../App';
import addTopic from '../src/addTopic';

import renderer from 'react-test-renderer';

it('works', () => {
    expect(1).toBe(1);
});

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders addTopic correctly', () => {
    const tree = renderer.create(<addTopic />).toJSON();
    expect(tree).toMatchSnapshot();
});