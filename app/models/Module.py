from app import db

class Module(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    modelNo = db.Column(db.String)
    
    maxChannels = db.Column(db.Integer)
    
    maxSamplingRate = db.Column(db.Integer)
    
    peakVoltRange = db.Column(db.Integer)
    
    type = db.Column(db.Enum('Analog_Input', ' Digital_Input', ' Digital_Output'))
    

    def to_dict(self):
        return dict(
            modelNo = self.modelNo,
            maxChannels = self.maxChannels,
            maxSamplingRate = self.maxSamplingRate,
            peakVoltRange = self.peakVoltRange,
            type = self.type,
            id = self.id
        )

    def __repr__(self):
        return '<Module %r>' % (self.id)
