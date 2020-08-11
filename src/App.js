import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {TeacherStreaming} from "./teacher/streaming";
import {TeacherStudentStreaming} from './student/streaming'
function App() {
  return (
      <div className="h-100">
          <>
              <TeacherStreaming/>
       {/*   <Suspense fallback={<div className="loading"/>}>
                  <Router>
                      <Switch>
                          <Route
                              path="/teacherstreaming"
                              exact
                              render={(props) => <TeacherStreaming {...props} />}
                          />

                          <Route
                              path="/teacherstudentstreaming"
                              exact
                              render={(props) => <TeacherStudentStreaming {...props} />}
                          />

                      </Switch>
                  </Router>
              </Suspense>*/}
          </>
      </div>
  );
}

export default App;
