import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container, Icon } from "semantic-ui-react";
import AddEntryForm from './components/AddEntryForm';
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import {updatePatient, setPatientList, setDiagnoses} from './state/reducer';
import { Patient, Entry, Diagnosis, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "./types";

import PatientListPage from "./PatientListPage";


export type EntryFormValues = Omit<HealthCheckEntry, "id">;

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        console.log(patientListFromApi);
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try{
        const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnoses(diagnoses));
      } catch(e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  },[dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
          <Route path="/patients/:id">
              <PatientPage/>
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch ] = useStateValue();
  const patient = patients[id];
  const fetchPatientData = async (id: string) => {
    try{
      console.log('fetching '+ id);
      const { data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patient));
    } catch(e){
      console.log(e);
    }
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(newPatient));
    } catch (e) {
      console.error(e);
    }
  };
  if(patient===undefined){
    return(
      <div>
        Wrong id
      </div>
    );
  }
  if(!patient.ssn || !patient.entries){
    void fetchPatientData(id);
  }
  let gendersymbol = "";
  if(patient.gender==='male') gendersymbol = "mars";
  if(patient.gender==='female') gendersymbol = "venus";
  if(patient.gender==='other') gendersymbol = "other gender";
  return(
    <div>
      <h1>{patient.name} <Icon className={gendersymbol}></Icon></h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Entries entries={patient.entries}/>
      <AddEntryForm onSubmit={submitNewEntry}/>
    </div>
  );
};

const Entries = ({entries}: {entries: Entry[]| undefined}) => {
  if(entries === undefined){
    return(null);
  }
  return(
    <div>
      <h2>entries</h2>
      {entries.map((entry: Entry) => <EntryElement key={entry.id} entry={entry}/> )}
    </div>
  );
};


const HospitalEntryElement = ({entry}: {entry: HospitalEntry}) => {
  const [{diagnoses}] = useStateValue();
  return(
    <div>
    <div>{entry.date} <Icon className="hospital"></Icon>
    <i>{entry.description}</i>
    </div>
    {entry.diagnosisCodes===undefined ? null : <ul>{entry.diagnosisCodes.map(code => <li key = {code}>{code} {diagnoses[code].name}</li>)}</ul>}
  </div>
  );
};

const HealtCheckEntryElement = ({entry}: {entry: HealthCheckEntry}) => {
  const [{diagnoses}] = useStateValue();
  return(
    <div>
    <div>{entry.date} <Icon className="doctor"></Icon>
    <i>{entry.description}</i>
    </div>
    {entry.diagnosisCodes===undefined ? null : <ul>{entry.diagnosisCodes.map(code => <li key = {code}>{code} {diagnoses[code]}</li>)}</ul>}
  </div>
  );
};


const OccupationalHealthcareEntryElement = ({entry}: {entry: OccupationalHealthcareEntry}) => {
  const [{diagnoses}] = useStateValue();
  return(
    <div>
    <div>{entry.date} <Icon className="stethoscope"></Icon>
    <i>{entry.description}</i>
    </div>
    {entry.diagnosisCodes===undefined ? null : <ul>{entry.diagnosisCodes.map(code => <li key = {code}>{code} {diagnoses[code]}</li>)}</ul>}
  </div>
  );
};

const EntryElement = ({entry}: {entry: Entry}) => {
  switch(entry.type){
    case "HealthCheck":
      return <HealtCheckEntryElement entry={entry}/>;
    case "Hospital":
      return <HospitalEntryElement entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryElement entry={entry}/>;
  }
};


  




export default App;
