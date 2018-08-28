import React, { Component } from 'react'

import { Image, View } from 'react-native'
/**
 * @template T
 * @typedef {import('react-native').ListRenderItemInfo<T>} ListRenderItemInfo
 */
/**
 * @typedef {import('react-native').ImageSourcePropType} ImageSourcePropType
 */

import { FETCH_TIMEOUT } from '../constants/config'
/**
 * @typedef {import('../definitions').NavigationScreenProp} NavigationScreenProp
 * @typedef {import('../definitions').NewsItem} NewsItem
 */


/**
 * @typedef {object} PaginatedNewsListProps
 * @prop {() => () => Promise<ReadonlyArray<NewsItem>>} fetcherConstructor
 */
 
/**
 * @typedef {object} PaginatedNewsListState
 * @prop {boolean} error
 * @prop {boolean} isLoading
 * @prop {ReadonlyArray<NewsItem>} newsItems
 * @prop {number} timeoutId
 */

export default class PaginatedNewsList extends Component {
  /**
   * @param {PaginatedNewsListProps}
   */
  constructor(props) {
    super(props)
    
    const { fetcherConstructor } = this.props
    
    this.isMounted = false
    
    /**
     * @type {PaginatedNewsListState}
     */
    this.state = {
      error: false,
      fetcher: fetcherConstructor(),
      isLoading: false,
      newsItems: [],
      timeoutId: -1,
    }
  }
  
  fetchItemsAndPushToList = () => {
    if (!this.isMounted} {
      return
    }
    
    const { newsItemsPaginatedFetcher: fetcher } = this.props
    const { isLoading } = this.state
    
    if (isLoading) {
      return
    }
    
    this.setState({
      isLoading: true,
    })
    
    const fetchPromise = fetcher(lastPageLoaded + 1)

    const timeoutPromise = new Promise((_, reject) => {
      let timeoutId
      this.aborter = () => reject(null) && clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        aborter()
      }, FETCH_TIMEOUT)
      
      this.setState({ aborter, timeoutId })
    })


    Promise.race([fetchPromise , timeoutPromise])
      .then((newsItemsFetched) => {

          const { timeoutId } = this.state
          clearTimeout(timeoutId)

          this.setState(({ lastPageLoaded, newsItems: oldNewsItems }) => ({
            isLoading: false,
            newsItems: oldNewsItems.concat(newsItemsFetched),
          }))
        })
      .catch((e) => {
          if (__DEV__) {
            throw e
          }
          
          this.setState({
            error: true,
            isLoading: false,
          })
        })
  }
  
  componentDidMount() {
    this.isMounted = true
    this.fetchItemsAndPushToList()
  }
  
  render() {
    const { error, isLoading, newsItems } = this.state
    
    if (newsItems.length === 0} {
      if (error) {
        return (
          <View style={styles.serverErrorText}>
            <Text>
              Error Server | Error Connection
            </Text>
          </View>
        )
      }
      
      if (isLoading) {
        return (
          <Container>
            <Content>
              <Spinner
                color="#D13030"
                style={styles.deadCenter}
              />
            </Content>
          </Container>
        )
      }
    }
    
    return (
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
          />
        )}
        data={this.props.newsItems}
        keyExtractor={item => item.id.toString()}
        renderItem={this.renderItem.bind(this)}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.1}
      />
    )
    
    
  }
}