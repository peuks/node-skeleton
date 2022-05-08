import { NextFunction, Request, Response } from 'express';
import to from '../../helper/to';
import { CreateVandorInput } from '../dto';
import Vendor from '../models/Vendor';

const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <
    CreateVandorInput
  >req.body;

  // const existingVandor = await FindVendor('', email);

  // if (existingVandor !== null) {
  // return res.json({ message: 'A vandor is exist with this email ID' });
  // }

  //generate a salt

  // const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  // encrypt the password using the salt

  const createdVandor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    lat: 0,
    lng: 0,
  });

  return res.json(createdVandor);
};

const GetVanndors = async (req: Request, res: Response, next: NextFunction) => {
  // const [error, vendors] = await to(Vendor.find());
  // return error || vendors !== null
  //   ? res.json(vendors)
  //   : res.json({ message: 'Vendors data not available' });
};

const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = req.params.id;

  // const [error, vendors] = await to(FindVendor(vendorId));

  // return error || vendors !== null
  //   ? res.json(vendors)
  //   : res.json({ message: 'Vendors data not available' });
  return res.json({ message: 'GetVandorByID' });
};

export { CreateVandor, GetVanndors, GetVandorByID };
