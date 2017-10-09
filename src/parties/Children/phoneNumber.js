import { AMaaSModel } from '../../core'

/**
 * Class representing an Phone Number
 * @memberof module:parties
 * @extends module:core.AMaaSModel
 */
class PhoneNumber extends AMaaSModel {
  /**
   * Construct a new phone number object
   * @param {object} params - phone number creation options:
   * @param {boolean} params.phoneNumberPrimary - Whether the phone number is primary for its owner. If a Party has phone number, at least one must be primary
   * @param {string} params.phoneNumber - Phone Number
   * @param {boolean} params.active - Whether the phone number is active for its owner
   * @param {string} [params.createdBy] - ID of the user that created the phone number
   * @param {string} [params.updatedBy] - ID of the user that updated the phone number
   * @param {date} [params.createdTime] - Time that the phone number was created
   * @param {date} [params.updatedTime] - Time that the phone number was updated
   * @param {number} [params.version] - Version number of the phone number
   */
  constructor({
    phoneNumberPrimary,
    phoneNumber,
    active,
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    Object.defineProperties(this, {
      _active: { writable: true, enumerable: false },
      active: {
        get: () => this._active,
        set: newActive => {
          switch (newActive) {
            case false:
              this._active = false
              break
            case undefined:
              this._active = true
              break
            default:
              this._active = newActive
          }
        },
        enumerable: true
      },
      _phoneNumberPrimary: { writable: true, enumerable: false },
      phoneNumberPrimary: {
        get: () => this._phoneNumberPrimary,
        set: newPhoneNumberPrimary => {
          switch (!!newPhoneNumberPrimary) {
            case false:
              this._phoneNumberPrimary = false
              break
            case undefined:
              this._phoneNumberPrimary = true
              break
            default:
              this._phoneNumberPrimary = !!newPhoneNumberPrimary
          }
        },
        enumerable: true
      }
    })
    this.phoneNumberPrimary = phoneNumberPrimary
    this.phoneNumber = phoneNumber
    this.active = active
  }
}

export default PhoneNumber
