import { Component } from 'react'


/**
 * @template T Type of resource to be loaded
 * @typedef {object} LoaderProps
 * @prop {() => Promise<T>} fetcherFunction Function in charge of
 * fetching the resource
 * @prop {(res: T|undefined, err?: boolean) => JSX.Element} children
 * Renderer function called with resource to be loaded when it becomes
 * available. This function must accept two parameters, the resource when loaded
 * and an optional 2nd parameter when there's an error thrown by the fetcher
 * @prop {JSX.Element} loadingElement React element to be rendered while the
 * resource is loading (e.g. an spinner).
 * @prop {number} timeout Timeout on milliseconds, if fetcherFunction hasn't
 * resolved before this time, cancel loading and render loadingElement
 */

/**
 * @template T Type of resource to be loaded
 * @typedef {object} LoaderState
 * @prop {boolean} isLoading True while resource is loading.
 * @prop {T|undefined} resource Resource when loaded, undefined otherwise
 * @prop {boolean} error True when error catched in fetcher function, false
 * otherwise
 * @prop {number|undefined} timeoutId
 */

/**
 * @template T
 * @augments {Component<LoaderProps<T>, LoaderState<T>>}
 */
export default class Loader extends Component {
  /**
   * Construct a new Loader component.
   * @param {LoaderProps<T>} props
   */
  constructor(props) {
    super(props)

    /**
     * @type {LoaderState<T>}
     */
    this.state = {
      error: false,
      isLoading: true,
      resource: undefined,
      timeoutId: undefined,
    }
  }

  componentDidMount() {
    // https://stackoverflow.com/questions/46946380/fetch-api-request-timeout

    Promise.race([
      this.props.fetcherFunction(),
      new Promise((_, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('TIMEOUT'))
        }, this.props.timeout)
        this.setState({ timeoutId })
      }),
    ])
      .then((res) => {
        this.setState({
          isLoading: false,
          resource: res,
        })
      })
      .catch((e) => {
        if (__DEV__) {
          throw e
        }
        if (typeof this.state.timeoutId === 'number') {
          clearTimeout(this.state.timeoutId)
        }
        this.setState({
          error: true,
          isLoading: false,
        })
      })
  }

  render() {
    const { error, isLoading, resource } = this.state
    const { children: renderFn, loadingElement } = this.props
    /*  eslint-disable indent */
    return isLoading
    ? (
      loadingElement
    )
    : (
      renderFn(resource, error)
    )
  }
}
