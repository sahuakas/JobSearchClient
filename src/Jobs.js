import React, { useState } from 'react';
import { Typography } from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Job from './Job'
import AlertDialog from './Jobinfo'
export default function Jobs({ jobs }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedJob,selectjob]=React.useState({})

  const numJobs = jobs.length;
  const splitPageValue = Math.ceil(numJobs / 50)

  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50)
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    
    <div className="jobs">
      <AlertDialog open={open} job={selectedJob} handleClose={handleClose}/>
      <Typography variant="h4" component="h1">Software Jobs</Typography>
      <div>Found {numJobs} jobs </div>
      {jobsOnPage.map(job => <Job job={job} onClick={() => {selectjob(job);handleClickOpen()}} />)}

      <MobileStepper
        variant="dots"
        steps={splitPageValue}
        position="static"
        activeStep={activeStep}

        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === (splitPageValue - 1)}>
            Next
          {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {<KeyboardArrowLeft />}
          Back
        </Button>
        }
      />
    </div>

  )
}
