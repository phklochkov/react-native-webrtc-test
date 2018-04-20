import React from 'react'
import {ScrollView, Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {getUserList} from './http'

const mock = [
  {
    "id": "6a05d47a-68e6-4299-b1ce-ce50b105f06c",
    "username": "carmack",
    "email": "",
    "firstName": "Ed",
    "lastName": "Carmack",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin",
    "groups": [
      {
        "id": "fefc0f85-ef04-4ddb-9de1-bc168a1a9e7a",
        "name": "Pete_Group",
        "description": ""
      },
      {
        "id": "a20f30fc-a7cf-11e7-8366-0a580a0a8155",
        "name": "kool kids club",
        "description": ""
      },
      {
        "id": "791ff34a-a7c5-11e7-b5f1-0a580a0a891b",
        "name": "jt.admin.group",
        "description": ""
      },
      {
        "id": "a59783ae-b03e-11e7-ae59-0a580a0a8c0a",
        "name": "DavidsAwesomeGroup-45365130",
        "description": "testing PUT/groups/{groupid} by editting this group description"
      },
      {
        "id": "d7f89add-efb5-11e7-be3e-0a580a0a970d",
        "name": "d",
        "description": ""
      },
      {
        "id": "56c0755e-e72e-11e7-ba4c-0a580a0a812e",
        "name": "   Test",
        "description": ""
      }
    ]
  },
  {
    "id": "63dd1184-c04a-415c-8cf7-374dbfbee1cd",
    "username": "jjenkins",
    "email": "",
    "firstName": "Leeroy",
    "lastName": "Jenkins",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin",
    "groups": [
      {
        "id": "a20f30fc-a7cf-11e7-8366-0a580a0a8155",
        "name": "kool kids club",
        "description": ""
      },
      {
        "id": "791ff34a-a7c5-11e7-b5f1-0a580a0a891b",
        "name": "jt.admin.group",
        "description": ""
      },
      {
        "id": "d3aecc40-f1e7-11e7-a2f1-0a580a0a860a",
        "name": "dddd",
        "description": ""
      },
      {
        "id": "6aae2391-d8ec-11e7-b0ee-0a580a0a8e17",
        "name": "           test 1@#$",
        "description": "а"
      }
    ]
  },
  {
    "id": "99c96965-8656-4d9e-8e97-e376966514d1",
    "username": "alexey.m",
    "email": "",
    "firstName": "Alexey",
    "lastName": "Mironov",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin",
    "groups": [
      {
        "id": "30553f54-e3d3-11e7-8f36-0a580a0a8006",
        "name": "AE",
        "description": ""
      },
      {
        "id": "ac8d5394-e505-11e7-b073-0a580a0a8a19",
        "name": "AEDup",
        "description": "AE Duplicate"
      },
      {
        "id": "e7913f63-e4a3-11e7-9814-0a580a0a880e",
        "name": "   test ",
        "description": "Abc"
      }
    ]
  },
  {
    "id": "00558b99-86c5-4d03-b510-c3dda015b6be",
    "username": "peter_man",
    "email": "",
    "firstName": "Peter",
    "lastName": "Man",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "manager",
    "groups": [
      {
        "id": "b306f0dd-cfdc-11e7-b0ee-0a580a0a8e17",
        "name": "DHL",
        "description": ""
      }
    ]
  },
  {
    "id": "1df45de6-9c16-4709-911e-99b302480f10",
    "username": "amy_smith",
    "email": "",
    "firstName": "Amy",
    "lastName": "Smith",
    "jobTitle": "Manager",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin"
  },
  {
    "id": "30e598c4-b0c6-47d9-bc30-efd2eedd8868",
    "username": "UPPERlower",
    "email": "",
    "firstName": "UPPER",
    "lastName": "lower",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user"
  },
  {
    "id": "22e529cf-ee48-4f6e-a1d7-7ef1092ff938",
    "username": "john_thompson",
    "email": "",
    "firstName": "John",
    "lastName": "Thompson",
    "jobTitle": "VP Operations",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin"
  },
  {
    "id": "57a5adee-c435-4dd1-9314-18059441fe60",
    "username": "schwing",
    "email": "",
    "firstName": "John",
    "lastName": "Schwinghammer",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin",
    "groups": [
      {
        "id": "fefc0f85-ef04-4ddb-9de1-bc168a1a9e7a",
        "name": "Pete_Group",
        "description": ""
      },
      {
        "id": "a20f30fc-a7cf-11e7-8366-0a580a0a8155",
        "name": "kool kids club",
        "description": ""
      },
      {
        "id": "791ff34a-a7c5-11e7-b5f1-0a580a0a891b",
        "name": "jt.admin.group",
        "description": ""
      }
    ]
  },
  {
    "id": "70968f19-4583-4a36-b960-d02d8d85d7dc",
    "username": "elizabeth_admin",
    "email": "",
    "firstName": "Elizabeth",
    "lastName": "Admin",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin"
  },
  {
    "id": "082fbb2f-de42-4e13-b7d4-4d7cd4bbee47",
    "username": "jt1",
    "email": "",
    "firstName": "Yo's",
    "lastName": "Lastname's's",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "manager",
    "groups": [
      {
        "id": "791ff34a-a7c5-11e7-b5f1-0a580a0a891b",
        "name": "jt.admin.group",
        "description": ""
      }
    ]
  },
  {
    "id": "fe809792-b35c-4730-bc0b-a9a28abc216e",
    "username": "lee.h",
    "email": "",
    "firstName": "Lee",
    "lastName": "Hendricks",
    "jobTitle": "Baller",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "upskill-leeprofilepng-1507218245712",
    "role": "admin",
    "groups": [
      {
        "id": "a20f30fc-a7cf-11e7-8366-0a580a0a8155",
        "name": "kool kids club",
        "description": ""
      },
      {
        "id": "75c4784e-2367-48ae-be77-2d789a94fd1b",
        "name": "group_9",
        "description": ""
      },
      {
        "id": "901f7b2f-69a8-4f9e-b5e8-98c663aea367",
        "name": "group_1",
        "description": "test"
      },
      {
        "id": "6b0cace6-62e3-4aaf-8508-00778ca485e6",
        "name": "group_8",
        "description": ""
      },
      {
        "id": "cc9313fc-d9b6-11e7-b0ee-0a580a0a8e17",
        "name": "          sds",
        "description": ""
      },
      {
        "id": "b306f0dd-cfdc-11e7-b0ee-0a580a0a8e17",
        "name": "DHL",
        "description": ""
      }
    ]
  },
  {
    "id": "7b8d76b5-4028-4198-b579-5b8caeb1ef5b",
    "username": "david4",
    "email": "",
    "firstName": "david4",
    "lastName": "",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "",
    "city": "",
    "state": "",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "admin",
    "groups": [
      {
        "id": "513bc590-63d0-4515-9819-c00572ae2bf8",
        "name": "one big group",
        "description": ""
      }
    ]
  },
  {
    "id": "5368affc-3932-4620-917e-9ba9074a97ef",
    "username": "test_user_18",
    "email": "",
    "firstName": "Alexander",
    "lastName": "Moore",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Madison St",
    "city": "Ransom Canyon",
    "state": "ME",
    "zipcode": 0,
    "locale": "",
    "avatar": "upskill-DiskSpeedTestbeforeHighSierraapng-1507218159996",
    "role": "admin",
    "groups": [
      {
        "id": "b5819283-cd73-4b16-8104-822b86e0bf3a",
        "name": "group_2",
        "description": ""
      },
      {
        "id": "92776be2-7c32-44e4-9614-8ea956d4aba5",
        "name": "group_3",
        "description": ""
      },
      {
        "id": "f9d7cbf2-b345-4550-a457-64c0aaf75366",
        "name": "group_4",
        "description": ""
      },
      {
        "id": "27b78590-c1e0-4ced-9025-906ccbee47de",
        "name": "group_5",
        "description": ""
      },
      {
        "id": "d60a31a2-5764-4ac0-a6a4-387bd5c4fa44",
        "name": "group_6",
        "description": ""
      },
      {
        "id": "bba05de5-437f-4b99-afb7-06368b9c622c",
        "name": "group_7",
        "description": ""
      },
      {
        "id": "75c4784e-2367-48ae-be77-2d789a94fd1b",
        "name": "group_9",
        "description": ""
      },
      {
        "id": "53501b16-6781-43ad-b7bd-90b753a4b099",
        "name": "group_0",
        "description": ""
      },
      {
        "id": "901f7b2f-69a8-4f9e-b5e8-98c663aea367",
        "name": "group_1",
        "description": "test"
      },
      {
        "id": "6b0cace6-62e3-4aaf-8508-00778ca485e6",
        "name": "group_8",
        "description": ""
      },
      {
        "id": "b69ac7c2-29d3-11e8-9a6a-0a580a0a8a0a",
        "name": "HeliumTest",
        "description": ""
      }
    ]
  },
  {
    "id": "69eb4285-fad3-446c-bf69-79b671c242bc",
    "username": "test_user_2",
    "email": "",
    "firstName": "Joshua",
    "lastName": "Robinson",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Wilson Circle",
    "city": "Northleach",
    "state": "FM",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user",
    "groups": [
      {
        "id": "901f7b2f-69a8-4f9e-b5e8-98c663aea367",
        "name": "group_1",
        "description": "test"
      }
    ]
  },
  {
    "id": "9844a980-60cf-4e67-a2ce-9a2dd727d844",
    "username": "test_user_3",
    "email": "",
    "firstName": "Mason",
    "lastName": "Williams",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Jefferson Circle",
    "city": "Derby Center",
    "state": "CA",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "manager",
    "groups": [
      {
        "id": "53501b16-6781-43ad-b7bd-90b753a4b099",
        "name": "group_0",
        "description": ""
      },
      {
        "id": "901f7b2f-69a8-4f9e-b5e8-98c663aea367",
        "name": "group_1",
        "description": "test"
      }
    ]
  },
  {
    "id": "a93f4b27-7a6e-41af-a3c7-00e34120765f",
    "username": "test_user_4",
    "email": "",
    "firstName": "Benjamin",
    "lastName": "Thompson",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Wilson Rd",
    "city": "Berkhamsted",
    "state": "MS",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user",
    "groups": [
      {
        "id": "f9d7cbf2-b345-4550-a457-64c0aaf75366",
        "name": "group_4",
        "description": ""
      },
      {
        "id": "0541f674-06bc-11e8-b8e2-0a580a0a98ac",
        "name": "Marcus Test group",
        "description": ""
      }
    ]
  },
  {
    "id": "505fd3f1-8f51-4a0c-86cc-4d08ef286ccd",
    "username": "test_user_5",
    "email": "",
    "firstName": "James",
    "lastName": "Jones",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Jackson Trl",
    "city": "Newstead",
    "state": "NE",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user",
    "groups": [
      {
        "id": "fefc0f85-ef04-4ddb-9de1-bc168a1a9e7a",
        "name": "Pete_Group",
        "description": ""
      },
      {
        "id": "a20f30fc-a7cf-11e7-8366-0a580a0a8155",
        "name": "kool kids club",
        "description": ""
      },
      {
        "id": "b5819283-cd73-4b16-8104-822b86e0bf3a",
        "name": "group_2",
        "description": ""
      },
      {
        "id": "92776be2-7c32-44e4-9614-8ea956d4aba5",
        "name": "group_3",
        "description": ""
      },
      {
        "id": "f9d7cbf2-b345-4550-a457-64c0aaf75366",
        "name": "group_4",
        "description": ""
      },
      {
        "id": "75c4784e-2367-48ae-be77-2d789a94fd1b",
        "name": "group_9",
        "description": ""
      },
      {
        "id": "513bc590-63d0-4515-9819-c00572ae2bf8",
        "name": "one big group",
        "description": ""
      },
      {
        "id": "53501b16-6781-43ad-b7bd-90b753a4b099",
        "name": "group_0",
        "description": ""
      },
      {
        "id": "901f7b2f-69a8-4f9e-b5e8-98c663aea367",
        "name": "group_1",
        "description": "test"
      },
      {
        "id": "6b0cace6-62e3-4aaf-8508-00778ca485e6",
        "name": "group_8",
        "description": ""
      },
      {
        "id": "0541f674-06bc-11e8-b8e2-0a580a0a98ac",
        "name": "Marcus Test group",
        "description": ""
      }
    ]
  },
  {
    "id": "a2df0026-d3e7-4c1b-8081-ba9fa8423209",
    "username": "test_user_6",
    "email": "",
    "firstName": "Jayden",
    "lastName": "Smith",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Washington Trl",
    "city": "Brandwell",
    "state": "GA",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "manager",
    "groups": [
      {
        "id": "f9d7cbf2-b345-4550-a457-64c0aaf75366",
        "name": "group_4",
        "description": ""
      },
      {
        "id": "bba05de5-437f-4b99-afb7-06368b9c622c",
        "name": "group_7",
        "description": ""
      }
    ]
  },
  {
    "id": "5d93744c-e871-471e-adab-84b9eaec163a",
    "username": "test_user_7",
    "email": "",
    "firstName": "Andrew",
    "lastName": "Jones",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Washington Ter",
    "city": "Bury",
    "state": "WA",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user",
    "groups": [
      {
        "id": "b5819283-cd73-4b16-8104-822b86e0bf3a",
        "name": "group_2",
        "description": ""
      },
      {
        "id": "513bc590-63d0-4515-9819-c00572ae2bf8",
        "name": "one big group",
        "description": ""
      }
    ]
  },
  {
    "id": "720392fb-d7dc-4b69-b10c-56b69be2b37d",
    "username": "test_user_8",
    "email": "",
    "firstName": "Andrew",
    "lastName": "Thompson",
    "jobTitle": "",
    "officePhone": "",
    "mobilePhone": "",
    "location": "",
    "street": "Adams Rd",
    "city": "Newstead",
    "state": "CA",
    "zipcode": 0,
    "locale": "",
    "avatar": "",
    "role": "user",
    "groups": [
      {
        "id": "d60a31a2-5764-4ac0-a6a4-387bd5c4fa44",
        "name": "group_6",
        "description": ""
      }
    ]
  }
]



export default class extends React.Component {
  state = {users: []}

  componentDidMount() {
    getUserList().then(users => {
      this.setState({users: users.slice(0, 50)})
    })
    .error(e => console.log('error', e))
  }

  onItemPress = u => {
    this.props.onSetAppState('main')
    this.props.onSetUsername(u.username)
  }

  renderUserItem = () => {
    if ((this.state.users || []).length === 0) {
      return <Text style={{flex: 1, fontSize: 22, justifyContent: 'center'}}>Loading...</Text>
    }

    return this.state.users.map(x => {
      return (
        <TouchableOpacity key={x.id} onPress={() => this.onItemPress(x)}>
          <View style={styles.item}>
            <View style={styles.itemIconContainer}>
              <Image source={require('./user-icon.png')} style={styles.itemIcon} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{`Name: ${x.firstName || ''} ${x.lastName || ''}`.trim()}</Text>
              <Text style={styles.itemText}>{`Username: ${x.username}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderUserItem()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%'
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#00aaed',
  },
  itemText: {
    fontSize: 20,
  },
  itemIconContainer: {
    flex: 0.2,
  },
  itemIcon: {
    width: 48,
    height: 48,
  },
  itemDetails: {
    flex: 0.8,
    justifyContent: 'flex-end'
  },
})
