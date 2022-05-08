import { NextFunction, Request, Response } from 'express';
import to from '../../helper/to';

const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
  //   const { name, address, pincode, foodType, email, password, ownerName, phone } = <
  //     CreateVandorInput
  //   >req.body;

  return res.status(200).json({ message: 'CreateVandor Function from AdminController' });
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
