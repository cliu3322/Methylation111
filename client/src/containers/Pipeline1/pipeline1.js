import React, { Component } from 'react';

import Dropzone from "../../components/uielements/dropzone.js";
import { notification } from "../../components";
import PageHeader from "../../components/utility/pageHeader";
import Box from "../../components/utility/box";
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import ContentHolder from "../../components/utility/contentHolder";
//import DropzoneWrapper from "./dropzone.style";
import IntlMessages from '../../components/utility/intlMessages';
import FormValidation from './FormValidation';

export default class extends Component {
  constructor(props) {
      super(props);

      // For a full list of possible configurations,
      // please consult http://www.dropzonejs.com/#configuration
      this.djsConfig = {
          addRemoveLinks: true,
          autoProcessQueue: false
      };

      this.componentConfig = {
          iconFiletypes: ['.jpg', '.png', '.gif'],
          showFiletypeIcon: true,
          postUrl: 'http://localhost:9000/pipeline/UploadFastQC'
      };

      this.dropzone = null;
  }



  handlePost() {
      this.dropzone.processQueue();
  };

  render () {

    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
        init: dz => this.dropzone = dz,
        addedfile: file => notification("success", `${file.name} added`),
        success: file =>
          notification("success", `${file.name} successfully uploaded`),
        error: error => notification("error", "Server is not set in the demo")
    }

    return (
      <LayoutWrapper>
        <PageHeader>pipeline 1</PageHeader>
        <Box title={<IntlMessages id="custom.input.uploadFastQC" />}>
          <ContentHolder>

              <Dropzone
                config={config}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
              />
              <div>
                  <button onClick={this.handlePost.bind(this)}>Upload</button>
              </div>

          </ContentHolder>
        </Box>
        <Box title={<IntlMessages id="custom.input.trim" />}>
          <FormValidation />
        </Box>
      </LayoutWrapper>
    )
  } ;
};
