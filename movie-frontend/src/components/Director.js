import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { withTransaction } from '@elastic/apm-rum-react'
import { apm } from '@elastic/apm-rum';

function Director({ onChange }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("directors")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let directors = res.map(element => {
          return { value: element, label: element }
        });
        setOptions(directors)
        setIsLoaded(true)
      },
        (error) => {
          apm.captureError(error)
          setError(error)
          setIsLoaded(true)
        });
  }, []);

  // react on change
  const handleChange = (selectedOptions) => {
    onChange(selectedOptions.map(o => o.value))
  }

  if (error) {
    return (
      <div>An error occured: {error.message} </div>
    )
  } else if (!isLoaded) {
    return (
      <div>Loading ...</div>
    )
  } else {
    return (
      <div>
        <Select
          options={options}
          isMulti={true}
          onChange={handleChange}
        />
      </div>
    );
  }
}

export default withTransaction('Director', "component")(Director);
