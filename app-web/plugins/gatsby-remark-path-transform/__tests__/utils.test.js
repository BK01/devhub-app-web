/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import transformRelativePaths from '../index';

import { GRAPH_QL_PARENT_NODE, MARKDOWN_NODE, IMAGE_AST_RELATIVE } from '../__fixtures__/fixtures';
// valid url mocked to return false
// the converter callback only calls the converter fn if isWebUri is false
jest.mock('valid-url', () => ({ isWebUri: jest.fn(() => false) }));

describe('gatsby-remark-path-transform', () => {
  describe('transformRelativePaths', () => {
    it("throws if converter option doesn't exist or is not a function", () => {
      expect(() => {
        transformRelativePaths({}, { converter: null });
      }).toThrow(
        "gatsby-remark-path-transform option: 'converter' must be passed in as a function!",
      );
      expect(() => {
        transformRelativePaths({});
      }).toThrow(
        "gatsby-remark-path-transform option: 'converter' must be passed in as a function!",
      );
    });

    it('calls converters when a node is visited', () => {
      const converter = jest.fn();
      const getNode = jest.fn();

      getNode.mockReturnValue(GRAPH_QL_PARENT_NODE);
      converter.mockReturnValue('URL');

      const markdownNode = MARKDOWN_NODE;
      const markdownAST = IMAGE_AST_RELATIVE;
      const oldURL = markdownAST.url;

      transformRelativePaths({ getNode, markdownAST, markdownNode }, { converter });

      expect(converter).toHaveBeenCalledWith('image', oldURL, GRAPH_QL_PARENT_NODE, getNode);
      // expect url to hvae been changed
      expect(oldURL).not.toBe(markdownAST.url);
    });
  });
});
