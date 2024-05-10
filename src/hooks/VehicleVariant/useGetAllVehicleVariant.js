import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
import gql from "graphql-tag";

const GET_ALL_VEHICLE_VARIANT = gql`
  query getAllVehicleVariant($first: ConnectionLimitInt, $offset: Int) {
    getAllVehicleVariant(first: $first, offset: $offset) {
      totalCount
      nodes {
        _id
        vehicleModelId
        productId
        brand
        model
        brakes {
          frontBrakes
          rearBrakes
        }
        coolant
        positionCylinders
        compressionRatio
        valveTrain
        generation
        valvesPerCylinder
        engineOilSpecs {
          engineOilCapacity
          oil
        }
        drive
        gearBoxType
        engineSpec {
          engineCode
          enginePosition
          engineDisplacement
        }
        torqueValue {
          torque
          torqueNm
          torqueRpm
          torqueRpmLow
          torqueRpmHigh
        }
        Suspension {
          frontSuspension
          rearSuspension
        }
        fuelSystem
        turbine
        positionCylinders
        cylinders
        bore
        stroke
        powerSpec {
          powerTrain
          power
          powerHp
          powerRpm
          powerRpmLow
        }
        rimsSize {
          all
        }
        tireSize {
          all
        }
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllVehicleVariant(filter) {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(GET_ALL_VEHICLE_VARIANT, {
    variables: filter,
    nextFetchPolicy: "network-only",
  });

  const viewer = data?.viewer;
  const totalCount = data?.getAllVehicleVariant?.totalCount;
  useEffect(() => {
    refetch();
  }, [authToken]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  return [data, loading, refetch, totalCount];
}
