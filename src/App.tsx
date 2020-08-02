import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {TeacherStreaming, StudentStreaming} from "./teacher/streaming";
import {TeacherStudentStreaming} from './student/streaming'

function App() {
  return (
      <div className="h-100">
          <>
              <Suspense fallback={<div className="loading"/>}>
                  <Router>
                      <Switch>
                          <Route
                              path="/teacherstreaming"
                              exact
                              render={(props) => <TeacherStreaming {...props} />}
                          />
                          <Route
                              path="/studentstreaming"
                              exact
                              render={(props) => <StudentStreaming {...props} />}
                          />
                          <Route
                              path="/teacherstudentstreaming"
                              exact
                              render={(props) => <TeacherStudentStreaming {...props} />}
                          />

                      </Switch>
                  </Router>
              </Suspense>
          </>
      </div>
  );
}

export default App;
