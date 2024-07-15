import { Certificate } from '../serverTypes';

export interface CertificateType extends Omit<Certificate, 'id'> {
  id?: string;
}

export interface profileCertificateState {
  certificate?: CertificateType;
}
