import React from 'react';

const Blogs = () => {
    return (
        <div className='w-3/4 my-10 mx-auto'>
            <div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6 shadow-2xl">
                    <div className="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>Managing state in your React apps isn’t as simple as using useState or useReducer.
                            <br />
                            Not only are there are a lot of different kinds of state, but there often dozens of ways of managing each kind. Which should you choose?
                            <br />
                            In this guide, we will uncover the several kinds of state in your React apps that you might not be aware of, plus how to manage them in the most effective way.</p>
                        <p>Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it.
                            <br />
                            useState is the first tool you should reach for to manage state in your components.
                            <br />
                            It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function (without needing optimizations like useCallback).</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6 shadow-2xl">
                    <div className="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6 shadow-2xl">
                    <div className="collapse-title text-xl font-medium">
                        What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content">
                        <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.</p>
                        <br />
                        <p>To verify the correctness of the code. To test every function and procedure. To fix bugs early in the development cycle and to save costs. To help the developers to understand the code base and enable them to make changes quickly.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6 shadow-2xl">
                    <div className="collapse-title text-xl font-medium">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <p>Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as:
                            <br />
                            “The modern web developer’s platform”
                            <br />
                            It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.
                            <br />
                            <br />
                            <br />
                            React is considered a UI library. They define themselves as:
                            <br />
                            “A JavaScript library for building user interfaces”
                            <br />
                            Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React.
                            <br />
                            <br />
                            <br />
                            Last but not least, Vue.js is, according to its site:
                            <br />
                            “A progressive JavaScript framework”
                            <br />
                            Vue.js is developed and led by Evan You, but also it counts on a huge open-source community.
                            <br />
                            <br />
                            <br />
                            These three frameworks have several things in common, such as each follows a component-based architecture and allows creating UI features quickly. React and Vue.js are mainly declarative, and while Angular could also be declarative, it’s really more imperative. Nevertheless, they present some more differences according to their structure, architecture and way of working, so let’s dive into all these characteristics.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;